import { createContext, useContext, useState } from 'react';

//creating the context
const AuthContext = createContext();

//custom hook with error checking
export function useAuth() {
    const context = useContext(AuthContext);
        if (!context) {
            throw new Error('useAuth must be used within an AuthProvider');
        }
    return context;
}

//AuthProvider will manage authentication state. the children prop allows this component to wrap other components. Context.Provider makes the value available to all child components.
export function AuthProvider({children}) {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [name, setName] = useState('');

    const login = async (userEmail, password) => {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, password }),
                credentials: 'include'
            };
        
        const res = await fetch('/api/users/logon', options);
        const data = await res.json();

        if (res.status === 200 && data.name && data.csrfToken) {
            //success: update state
            setEmail(data.name);
            setToken(data.csrfToken);
            setName(data.name);
            return { success: true };
        } else {
            //Failure: return error
            console.error('Login failed:', data);
            return {
                success: false,
                error: 'Invalid email or password.'
            };
        }
        } catch (error) {
            return {
                success: false,
                error: 'Network error during login'
            };
        } 
    };

    const logout = async() => {
        if (!token) {
            setEmail('');
            setToken('');
            setName('');
            return { success: true };  
        }
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token },
                credentials: 'include'
            };
        
        const res = await fetch('/api/users/logoff', options);

        if (res.ok) {
            return { success: true };
        } else {
            const data = await res.json();
            console.error('Logout failed:', data);
            return {
                success: false,
                error: 'Unable to log off successfully. Please try again.'
            };
        }
        } catch (error) {
            return {
                success: false,
                error: 'Network error during logout'
            };
        } finally {
            setEmail('');
            setToken('');
            setName('');
        }
    };

    const value = {
        email,
        token,
        name,
        isAuthenticated: !!token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

