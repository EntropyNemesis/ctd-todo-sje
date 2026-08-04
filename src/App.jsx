import './App.css';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import {useState} from 'react';

  /*  const todos = [
        {id: 1, title: "prep wooden boat trim pieces"},
        {id: 2, title: "acquire replacement trailer tires"},
        {id: 3, title: "topcoat trim pieces"},
  ] */

function App() {
  
  const [ todoList, setTodoList ] = useState([]);

  function addTodo(todoTitle) {
    const newTodo = {id: Date.now(), title: todoTitle};
    setTodoList(previous => [newTodo, ...previous])
  }
  
  return (

    <div>
      <h1>My To-Do List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
      
    </div>
  )   
}

export default App
