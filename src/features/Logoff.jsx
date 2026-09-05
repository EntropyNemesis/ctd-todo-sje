import {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';

function Logoff() {
    const [authError, setAuthError] = useState('');
    const [isLoggingOff, setIsLoggingOff] = useState(false);

    const {logout} = useAuth();

    const handleLogoff = async () => {
        setIsLoggingOff(true);

        const result = await logout();
        if (result.success) {
            setAuthError('');
        }
        else {
            setAuthError(result.error);
        }

        setIsLoggingOff(false);
    };

    //     try {
    //         const response = await fetch('/api/users/logoff', {
    //             method: 'POST',
    //             headers: {'X-CSRF-TOKEN': token},
    //             credentials: 'include'
    //         });

    //         if (response.ok) {
    //             setAuthError('');
    //         } else {
    //             const data = await response.json().catch(() => null);
    //             setAuthError(`Logout failed: ${data?.message}`);
    //         }
    //     }
    //     catch(error) {
    //         setAuthError(`Error: ${error.name} | ${error.message}`);
    //     }
    //     finally {
    //         onSetEmail('');
    //         onSetToken('');
    //         setIsLoggingOff(false);
    //     }
    //};

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
