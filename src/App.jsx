import './App.css';
import Header from './shared/Header.jsx'
import TodosPage from './pages/TodosPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
//import {useState} from 'react';
//import {useAuth} from './contexts/AuthContext.jsx';
import {Routes, Route} from 'react-router';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotFoundPage from './pages/NotfFoundPage.jsx';
import RequireAuth from './components/RequireAuth.jsx';


function App() {
  // const [email, setEmail] = useState('');
  // const [token, setToken] = useState('');
  //const {isAuthenticated} = useAuth();

  return (

    <>
      <Header />
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route 
            path='/todos' 
            element= {
              <RequireAuth>
                <TodosPage />
              </RequireAuth>
            }
            />
          <Route 
            path='/profile'
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
            />
            <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

/* This organization separates concerns: App handles layout and will 
eventually handle authentication, while TodosPage handles all todo-specific 
logic. The shared/ directory contains components used across multiple features. 
*/
