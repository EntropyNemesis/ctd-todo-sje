import './App.css';
import Header from './shared/Header.jsx'
import TodosPage from './features/Todos/TodosPage.jsx'

function App() {
  
  return (

    <div>
      <Header />
      <TodosPage />
    </div>
  )   
}

export default App

/* This organization separates concerns: App handles layout and will 
eventually handle authentication, while TodosPage handles all todo-specific 
logic. The shared/ directory contains components used across multiple features. 
*/
