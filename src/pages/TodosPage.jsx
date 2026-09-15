import TodoList from '../features/Todos/TodoList/TodoList.jsx';
import TodoForm from '../features/Todos/TodoForm.jsx';
import SortBy from '../shared/SortBy.jsx';
import FilterInput from '../shared/FilterInput.jsx';
import useDebounce from '../utils/useDebounce.js';
import {useEffect, useReducer} from 'react';
import {useSearchParams} from 'react-router';
import {TODO_ACTIONS, initialTodoState, todoReducer }  from '../reducers/todoReducer.js';
import {useAuth} from '../contexts/AuthContext.jsx';
import StatusFilter from '../shared/StatusFilter.jsx';
import styles from './TodosPage.module.css';


function TodosPage() {
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);

    const {
      todoList,
      error,
      isTodoListLoading,
      sortBy,
      sortDirection,
      filterTerm,
      filterError,
      dataVersion
    } = state;

    const debouncedFilterTerm = useDebounce(filterTerm, 300);

    const {token} = useAuth();
    const [searchParams] = useSearchParams();
    const statusFilter = searchParams.get('status') || 'all';

  useEffect(() => {
    if (!token) return;
    (async function fetchTodos() {
      try{
        dispatch({type: TODO_ACTIONS.FETCH_START})
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
        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          tasks: data.tasks
        })
      }
      catch(error) {
        const isFilteredOrSorted = Boolean(debouncedFilterTerm) || sortBy !== 'createdAt' || sortDirection !== 'desc';
        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          error: error.message,
          isFilterError: isFilteredOrSorted
        })
      }
    })();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    const newTodo = {id: Date.now(), title: todoTitle, isCompleted: false};
    dispatch({type: TODO_ACTIONS.ADD_TODO_START, newTodo});

    const options = {
      method: 'POST',
      body: JSON.stringify({title: newTodo.title, isCompleted: newTodo.isCompleted}),
      headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': token},
      credentials: 'include'
    };
    try{
      const resp = await fetch('/api/tasks', options)     //exclude curly brackets around options, because brackets would create a new object with one property named options, instead of just referencing the existing object called options like we've done here.
      if (!resp.ok) {
        dispatch({
          type: TODO_ACTIONS.ADD_TODO_ERROR,
          tempId: newTodo.id,
          error: 'There was an unexpected error adding that Todo item. Please try again.'
        })

      } 
      else {
        const data = await resp.json()
        dispatch({
          type: TODO_ACTIONS.ADD_TODO_SUCCESS,
          tempId: newTodo.id,
          todo: data
        })
      }
    }
    
    catch(error){
      dispatch({
          type: TODO_ACTIONS.ADD_TODO_ERROR,
          tempId: newTodo.id,
          error: `Error: ${error.name} | ${error.message}`
      })
    }
  }


  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      id  //equivalent to writing id: id. can be written shorthand because is already in scope of this completeTodo function, as its parameter
    })

    const options = {
      method: 'PATCH',
      body: JSON.stringify({isCompleted: true}),
      headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': token},
      credentials: 'include'
    };
    try{
      const resp = await fetch(`/api/tasks/${id}`, options)   
      if (!resp.ok) {
        dispatch({ 
          type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
          id,
          originalTodo,
          error: 'There was an unexpected error. Please try again.'
        })
      } 
    else {
      const data = await resp.json()
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
        id,
        todo: data
      })
    }
      
  }
    
    catch(error){
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        id,
        originalTodo,
        error: `Error: ${error.name} | ${error.message}`
      })
    }
  }
    
  

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      editedTodo
    })

    const options = {
      method: 'PATCH',
      body: JSON.stringify({title: editedTodo.title, isCompleted: editedTodo.isCompleted}),
      headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': token},
      credentials: 'include'
    };

    try{
      const resp = await fetch(`/api/tasks/${editedTodo.id}`, options)   
      if (!resp.ok) {
        dispatch({
          type: TODO_ACTIONS.UPDATE_TODO_ERROR,
          originalTodo,
          error: 'There was an unexpected error. Please try again.'
        })
      } 
    else {
      const data = await resp.json()
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        todo: data
      })
    }
    }
    
    catch(error){
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        originalTodo,
        error: `Error: ${error.name} | ${error.message}`
      })
    }
  }

   async function deleteTodo(id) {
      const deletedTodo = todoList.find((todo) => todo.id === id);

      dispatch({
          type: TODO_ACTIONS.DELETE_TODO_START,
          id
      });

      const options = {
          method: 'DELETE',
          headers: {'X-CSRF-TOKEN': token},
          credentials: 'include'
      };
      try{
          const resp = await fetch(`/api/tasks/${id}`, options)
          if (!resp.ok) {
              dispatch({
                  type: TODO_ACTIONS.DELETE_TODO_ERROR,
                  deletedTodo,
                  error: 'There was an unexpected error deleting that Todo item. Please try again.'
              })
          }
          else {
              dispatch({
                  type: TODO_ACTIONS.DELETE_TODO_SUCCESS
              })
          }
      }
      catch(error){
          dispatch({
              type: TODO_ACTIONS.DELETE_TODO_ERROR,
              deletedTodo,
              error: `Error: ${error.name} | ${error.message}`
          })
      }
   }


  return(
    <div className={styles.page}>
      {error && (
        <div className={styles.errorBanner}>
          <p className={styles.errorText}>{error}</p>
          <button onClick={() => 
            dispatch({type: TODO_ACTIONS.CLEAR_ERROR})
            } className={styles.secondaryButton}>Clear Error</button>
        </div>
      )}

      {filterError && (
          <div className={styles.filterErrorBanner}>
            <p className={styles.filterErrorText}>{filterError}</p>  
            <div className={styles.buttonGroup}>  
              <button onClick={() => 
                dispatch({type: TODO_ACTIONS.CLEAR_FILTER_ERROR})
                } className={styles.secondaryButton}>Clear Filter Error</button>  
              <button onClick={() => {
                dispatch({type: TODO_ACTIONS.RESET_FILTERS})
                }
              } className={styles.secondaryButton}>Reset Filters</button>
            </div>
          </div>
        )}    
    
      {isTodoListLoading && <p className={styles.loading}>Loading...</p>}
    
      <div className={styles.controls}>
          <SortBy 
            sortBy={sortBy} 
            sortDirection={sortDirection} 
            onSortByChange={(newSortBy) =>
              dispatch({
                type: TODO_ACTIONS.SET_SORT,
                sortBy: newSortBy,
                sortDirection
              })
            } 
            onSortDirectionChange={(newSortDirection) =>
              dispatch({
                type: TODO_ACTIONS.SET_SORT,
                sortBy,
                sortDirection: newSortDirection
              })
            }/>
          <StatusFilter />
          <FilterInput 
            filterTerm={filterTerm} 
            onFilterChange={(newTerm) =>
              dispatch({
                type: TODO_ACTIONS.SET_FILTER,
                filterTerm: newTerm
              })
              }/>
          </div>
          <TodoForm onAddTodo={addTodo} />
          <TodoList 
            todoList={todoList} 
            onCompleteTodo={completeTodo} 
            onUpdateTodo={updateTodo} 
            onDeleteTodo={deleteTodo}
            dataVersion={dataVersion}
            statusFilter={statusFilter}
          />
      </div>
  );
}

export default TodosPage;