import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
    const {isAuthenticated, name, token} = useAuth();
    const [todoStats, setTodoStats] = useState({total: 0, completed: 0, active: 0});
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) return;
            (async function fetchTodos() {
            try{
                const options = {
                headers: {
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                }

                const paramsObject = {
                limit: 100,
                };
  
                const params = new URLSearchParams(paramsObject);

                const response = await fetch(`/api/tasks?${params}`, options);

                if (!response.ok) {
                throw new Error(response.status)
                }
                
                const data = await response.json();     //this parses the data by converting the response into JSON, return a promise that resolves to the actual parsed data (in this case, an array of todo objects from the API. it calls .json() to get the real data, then passes it into setTodoList())
                
                const total = data.tasks.length;
                const completed = data.tasks.filter((task) => task.isCompleted).length;
                const active = total - completed;

                setTodoStats({total: total, completed: completed, active: active});
                // setFilterError('');
                // setError('');
            }
            catch(error);
            ) {
                setError('Sorry, there was an error fetching your todos. Please try again.');
            }
                
            finally{
   
            }
            })();
        }, [token]);


    return (
        <>
            {error && <p>{error}</p>}
            
            <h3>Hi, {name}!</h3>

            <h3>Todo Stats:</h3>
            <ul>
                <li>Total: {todoStats.total}</li>
                <li>Completed: {todoStats.completed}</li>
                <li>Active: {todoStats.active}</li>
            </ul>
        </>
    )
}

export default ProfilePage;