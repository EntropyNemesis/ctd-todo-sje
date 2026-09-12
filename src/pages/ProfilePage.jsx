import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
    const {isAuthenticated, name, token} = useAuth();
    const [todoStats, setTodoStats] = useState({total: 0, completed: 0, active: 0, percentage: 0});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) return;
            (async function fetchTodos() {
            try{
                setLoading(true);
                setError('');

                const options = {
                headers: {'X-CSRF-TOKEN': token},
                credentials: 'include',
                }

                const paramsObject = {
                limit: 100,
                };
  
                const params = new URLSearchParams(paramsObject);

                const response = await fetch(`/api/tasks?${params}`, options);

                if (response.status === 401) {
                    throw new Error('Unauthorized');
                }
                if (!response.ok) {
                throw new Error(response.status)
                }
                
                const data = await response.json();     //this parses the data by converting the response into JSON, return a promise that resolves to the actual parsed data (in this case, an array of todo objects from the API. it calls .json() to get the real data, then passes it into setTodoList())
                
                const total = data.tasks.length;
                const completed = data.tasks.filter((task) => task.isCompleted).length;
                const active = total - completed;
                const percentage = Math.round((completed / total) * 100);

                setTodoStats({total: total, completed: completed, active: active, percentage: percentage});
                // setFilterError('');
                // setError('');
            }
            catch(err)
                {
                    setError(`Error loading statistics: ${err.message}`);
                }
                
            finally{
                setLoading(false);
            }
            })();
        }, [token]);


    return (
        <>
                     
            <h3>Hi, {name}!</h3>
            <h4>You are {isAuthenticated ? 'Logged in.' : 'Logged out.'}</h4>


                <h3>Todo Stats:</h3>
                {loading && <p>Loading...</p>}
                {!loading && error && <p>{error}</p>}
                {!loading && !error && 
                <ul>
                    <li>Total: {todoStats.total}</li>
                    <li>Completed: {todoStats.completed}</li>
                    <li>Active: {todoStats.active}</li>
                    {todoStats.total > 0 &&
                        <li>Percentage: {todoStats.percentage}%</li>}
                </ul>
                }
        </>
    )
}

export default ProfilePage;