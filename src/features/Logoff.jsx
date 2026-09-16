import {useState} from 'react';
import {useNavigate} from 'react-router';
import {useAuth} from '../contexts/AuthContext';
import styles from './Logoff.module.css';

function Logoff() {
    const [authError, setAuthError] = useState('');
    const [isLoggingOff, setIsLoggingOff] = useState(false);

    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogoff = async () => {
        setIsLoggingOff(true);
        setAuthError('');

        const result = await logout();
        if (result.success) {
            navigate('/login');
        }
        else {
            setAuthError(result.error);
            setIsLoggingOff(false);
        }
    };

    return (
        <>
            {authError && <p className={styles.error}>{authError}</p>}
            <button
                type="button"
                onClick={handleLogoff}
                disabled={isLoggingOff}
                className={styles.secondary}>
                {isLoggingOff ? 'Logging off...' : 'Log Off'}
            </button>
        </>
    );
}

export default Logoff;
