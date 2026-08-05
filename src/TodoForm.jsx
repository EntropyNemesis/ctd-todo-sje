import {useRef} from 'react';
import { useState } from 'react';

function TodoForm({onAddTodo}) {
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const inputRef = useRef();

    const handleAddTodo = (event) => {
        event.preventDefault();
       
       //.trim prevents whitespace-only todo entries
       // const todoTitle = event.target.todoTitle.value.trim();
    
        if (workingTodoTitle.trim() !== "") {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle("");
         // event.target.reset();
            inputRef.current.focus();
        }

    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input 
                ref={inputRef}
                type="text" 
                id="todoTitle"
                name="todoTitle"
                placeholder={'Todo text'}
                required 
                value={workingTodoTitle}
                onChange= {(event) => setWorkingTodoTitle(event.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default TodoForm;