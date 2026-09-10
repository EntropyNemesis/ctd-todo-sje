import './App.css';
import Header from './shared/Header.jsx'
import TodosPage from './pages/TodosPage.jsx'
import Logon from './features/Logon.jsx'
//import {useState} from 'react';
//import {useAuth} from './contexts/AuthContext.jsx';
import {Routes, Route} from 'react-router';

function App() {
  // const [email, setEmail] = useState('');
  // const [token, setToken] = useState('');
  const {isAuthenticated} = useAuth();

  return (

    <>
      <Header />
      
      <Routes>

      </Routes>
      
    </>
  );
}

export default App

/* This organization separates concerns: App handles layout and will 
eventually handle authentication, while TodosPage handles all todo-specific 
logic. The shared/ directory contains components used across multiple features. 
*/
