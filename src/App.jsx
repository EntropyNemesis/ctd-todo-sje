import './App.css';
import Header from './shared/Header.jsx'
import TodosPage from './features/Todos/TodosPage.jsx'
import Logon from './features/Logon.jsx'
//import {useState} from 'react';
import {useAuth} from './contexts/AuthContext.jsx';

function App() {
  // const [email, setEmail] = useState('');
  // const [token, setToken] = useState('');
  const {isAuthenticated} = useAuth();

  return (

    <div>
      <Header 
        //token={token} onSetEmail={setEmail} onSetToken={setToken}
      />
      {isAuthenticated ? 
        <TodosPage /*token={token}*/ /> : 
        <Logon /*onSetEmail={setEmail} onSetToken={setToken}*/ />}
      
    </div>
  )   
}

export default App

/* This organization separates concerns: App handles layout and will 
eventually handle authentication, while TodosPage handles all todo-specific 
logic. The shared/ directory contains components used across multiple features. 
*/
