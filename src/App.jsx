import './App.css'

function App() {
  
  const toDoList = [
    {id: 0, title: "prep wooden boat trim pieces"},
    {id: 1, title: "acquire replacement trailer tires"},
    {id: 2, title: "topcoat trim pieces"},
  ]
  
  return (

    <div>
      <h1>My To-Do List</h1>
      <ul>{toDoList.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
    </div>
  )   
}

export default App
