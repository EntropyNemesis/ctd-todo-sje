import {useState} from 'react';
import {useNavigate} from 'react-router';
import {useAuth} from '../contexts/AuthContext';


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
            {authError && <p>{authError}</p>}
            <button
                type="button"
                onClick={handleLogoff}
                disabled={isLoggingOff}>
                {isLoggingOff ? 'Logging off...' : 'Log Off'}
            </button>
        </>
    );
}

export default Logoff;
