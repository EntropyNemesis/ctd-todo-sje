import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

function RequireAuth({children}) {
    const {isAuthenticated} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    


    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', {state: {from: location}});
        }
    
    }, [isAuthenticated, location.pathname, navigate])
    
    return (
        <>
        {isAuthenticated ? children : 'Loading...'}
        </>
    )
}

export default RequireAuth;