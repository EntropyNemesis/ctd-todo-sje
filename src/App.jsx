import './App.css'

function App() {
  
  const todoList = [
    {id: 1, title: "prep wooden boat trim pieces"},
    {id: 2, title: "acquire replacement trailer tires"},
    {id: 3, title: "topcoat trim pieces"},
  ]
  
  return (

    <div>
      <h1>My To-Do List</h1>
      <ul>{todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
    </div>
  )   
}

export default App
