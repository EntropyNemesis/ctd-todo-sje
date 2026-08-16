import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import {useState} from 'react';

  /*  const todos = [
        {id: 1, title: "prep wooden boat trim pieces"},
        {id: 2, title: "acquire replacement trailer tires"},
        {id: 3, title: "topcoat trim pieces"},
  ] */

function App() {
  
  const [ todoList, setTodoList ] = useState([]);

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


  return (

    <div>
      <h1>My To-Do List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>
      
    </div>
  )   
}

export default App
