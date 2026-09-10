import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

function RequireAuth({children}) {
    const {isAuthenticated} = useAuth();
    const {pathname} = useLocation();
    const navigate = useNavigate();
    


    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', {state: {from:{pathname}}});
        }
    
    }, [isAuthenticated, navigate])
    
    return (
        <>
        {isAuthenticated? children : 'Loading...'}
        </>
    )
}

export default RequireAuth;