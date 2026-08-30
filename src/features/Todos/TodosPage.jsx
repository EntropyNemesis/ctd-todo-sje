import TodoList from '../Todos/TodoList/TodoList.jsx';
import TodoForm from '../Todos/TodoForm.jsx';
import SortBy from '../../shared/SortBy.jsx';
import FilterInput from '../../shared/FilterInput.jsx';
import useDebounce from '../../utils/useDebounce.js';
import {useState, useEffect} from 'react';

function TodosPage({token}) {
    const [ todoList, setTodoList ] = useState([]);
    const [error, setError] = useState('');
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filterTerm, setFilterTerm] = useState('');
    const debouncedFilterTerm = useDebounce(filterTerm, 300);

    const handleFilterChange = (newTerm) => { 
      setFilterTerm(newTerm); 
    };

  useEffect(() => {
    if (!token) return;
    (async function fetchTodos() {
      try{
        setIsTodoListLoading(true);
        const options = {
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        }

        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 100,
        };
        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }
        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, options);

        if (response.status === 401) {
            throw new Error('Unauthorized');
            }
        
        if (!response.ok) {
          throw new Error(response.status)
        }
        
        const data = await response.json();     //this parses the data by converting the response into JSON, return a promise that resolves to the actual parsed data (in this case, an array of todo objects from the API. it calls .json() to get the real data, then passes it into setTodoList())
        setTodoList(data.tasks);
        setError('');
        
      }
      catch(error) {
        setError(`Error: ${error.name} | ${error.message}`);
      }
      finally{
        setIsTodoListLoading(false);
      }
    })();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    const newTodo = {id: Date.now(), title: todoTitle, isCompleted: false};
    setTodoList(previous => [newTodo, ...previous])
    const options = {
      method: 'POST',
      body: JSON.stringify({title: newTodo.title, isCompleted: newTodo.isCompleted}),
      headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': token},
      credentials: 'include'
    };
    try{
      const resp = await fetch('/api/tasks', options)     //exclude curly brackets around options, because brackets would create a new object with one property named options, instead of just referencing the existing object called options like we've done here.
      if (!resp.ok) {
        setTodoList(previous => previous.filter(todo => todo.id !== newTodo.id));
        setError('There was an unexpected error adding that Todo item. Please try again.');
      } 
      else {
        const data = await resp.json()
        setError('');
        setTodoList(previous => previous.map(todo => todo.id === newTodo.id ? data : todo));
      }
    }
    
    catch(error){
      setError(`Error: ${error.name} | ${error.message}`);
      setTodoList(previous => previous.filter(todo => todo.id !== newTodo.id));
    }

    finally{

    }
  }


  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);
    /*let originalTodo;

  for (const todo of todoList) {
    if (todo.id === id) {
      originalTodo = todo;
      break;
    }
  } */ 
    setTodoList(previous => 
      previous.map(todo => todo.id === id ? {...todo, isCompleted: true} : todo)
    );
    const options = {
      method: 'PATCH',
      body: JSON.stringify({isCompleted: true}),
      headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': token},
      credentials: 'include'
    };
    try{
      const resp = await fetch(`/api/tasks/${id}`, options)   
      if (!resp.ok) {
        setTodoList(previous => previous.map(todo => todo.id === id ? originalTodo : todo));
        setError('There was an unexpected error. Please try again.');
      } 
    else {
      const data = await resp.json()
      setError('');
      setTodoList(previous => previous.map(todo => todo.id === id ? data : todo));
    }
  }
    
    catch(error){
      setError(`Error: ${error.name} | ${error.message}`);
      setTodoList(previous => previous.map(todo => todo.id === id ? originalTodo : todo));
    }

    finally{

    }
  }
    
  

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    setTodoList(previous => previous.map(todo => todo.id === editedTodo.id ? {...editedTodo} : todo));
    /*const updatedTodos = todoList.map(todo =>   //Claude suggested to make consistent pattern with other functions and prevent stale state:  setTodoList(previous => previous.map(todo => todo.id === editedTodo.id ? {...editedTodo} : todo));
      todo.id === editedTodo.id ? {...editedTodo} : todo); */


    const options = {
      method: 'PATCH',
      body: JSON.stringify({title: editedTodo.title, isCompleted: editedTodo.isCompleted}),
      headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': token},
      credentials: 'include'
    };

    try{
      const resp = await fetch(`/api/tasks/${editedTodo.id}`, options)   
      if (!resp.ok) {
        setTodoList(previous => previous.map(todo => todo.id === editedTodo.id ? originalTodo : todo));
        setError('There was an unexpected error. Please try again.');
      } 
    else {
      const data = await resp.json()
      setError('');
      setTodoList(previous => previous.map(todo => todo.id === editedTodo.id ? data : todo));
      }
    }
    
    catch(error){
      setError(`Error: ${error.name} | ${error.message}`);
      setTodoList(previous => previous.map(todo => todo.id === editedTodo.id ? originalTodo : todo));
    }

    finally{

    }
  }

  return(
    <>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError('')}>Clear Error</button>
        </div>
      )}
    
      {isTodoListLoading && <p>Loading...</p>}
    
      <div>
          <SortBy sortBy={sortBy} sortDirection={sortDirection} onSortByChange={setSortBy} onSortDirectionChange={setSortDirection}/>
          <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange}/>
          <TodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>
      </div>
    </>
  )
}

export default TodosPage;