import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext.jsx';
import styles from './LoginPage.module.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);
    const {login, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    

    //gets intended destination from location state, defaults to /todos
    const from = location.state?.from
        ? location.state.from.pathname + (location.state.from.search || '') 
        : '/todos';

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
        <div className={styles.page}>
            <div className={styles.card}>
                {authError && <p className={styles.error}>{authError}</p>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type= 'text'
                            id='email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required 
                            className={styles.input} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Password: </label>
                        <input 
                            type= 'password'
                            id='password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            className={styles.input} />
                    </div>
                    <button 
                        type="submit"
                        disabled={isLoggingOn}
                        className={styles.primaryButton}>
                        {isLoggingOn ? 'Logging in...' : 'Log On'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;