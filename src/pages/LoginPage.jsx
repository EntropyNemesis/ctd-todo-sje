import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext.jsx';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);
    const {login, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    

    //gets intended destination from location state, defaults to /todos
    const from = location.state?.from?.pathname || '/todos';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, {replace: true});
        }
    }, [isAuthenticated, navigate, from]);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoggingOn(true); 

        const result = await login(email, password);
            if (result.success) {
                setAuthError('');
            }
            else {
                setAuthError(result.error);
            }

            setIsLoggingOn(false);
    }

    return (
        <>
            {authError && <p>{authError}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input 
                    type= 'text'
                    id='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required />

                <label htmlFor="password">Password: </label>
                <input 
                    type= 'password'
                    id='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required />
                <button 
                    type="submit"
                    disabled={isLoggingOn}>
                    {isLoggingOn ? 'Logging in...' : 'Log On'}
                </button>
            </form>
        </>
    )
}

export default LoginPage;