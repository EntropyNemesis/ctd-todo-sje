import TodoList from '../Todos/TodoList/TodoList.jsx';
import TodoForm from '../Todos/TodoForm.jsx';
import {useState, useEffect} from 'react';

function TodosPage({token}) {
    const [ todoList, setTodoList ] = useState([]);
    const [error, setError] = useState('');
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    (async function fetchTodos() {
      try{
        setIsTodoListLoading(true);
        const params = new URLSearchParams({
          limit: 100,
        });
        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        if (response.status === 401) {
            throw new Error('Not authorized. Please log in.');
            }
        
        if (!response.ok) {
          throw new Error(response.status)
        }
        
        const data = await response.json();     //this parses the data by converting the response into JSON, return a promise that resolves to the actual parsed data (in this case, an array of todo objects from the API. it calls .json() to get the real data, then passes it into setTodoList())
        setTodoList(data.tasks);
        
      }
      catch(error) {
        setError(`Error: ${error.name} | ${error.message}`);
      }
      finally{
        setIsTodoListLoading(false);
      }
    })();
  }, [token]);

  function addTodo(todoTitle) {
    const newTodo = {id: Date.now(), title: todoTitle, isCompleted: false};
    setTodoList(previous => [newTodo, ...previous])
  }


  function completeTodo(id) {
    setTodoList(previous => 
      previous.map(todo => todo.id === id ? {...todo, isCompleted: true} : todo)
    );
  }   

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map(todo => 
      todo.id === editedTodo.id ? {...editedTodo} : todo);
    setTodoList(updatedTodos);
  }

  return(
    <div>
        <TodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>
    </div>
  )
}

export default TodosPage;