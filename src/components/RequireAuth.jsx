import { useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

function RequireAuth({children}) {
    const {isAuthenticated} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);
    


    useEffect(() => {
        if (!isAuthenticated) {
            setIsRedirecting(true);
            navigate('/login', {state: {from: location}});
        }
    
    }, [isAuthenticated, location.pathname, navigate])
    
    return (
        <>
        {isRedirecting || !isAuthenticated ? 'Loading...' : children}
        </>
    )
}

export default RequireAuth;