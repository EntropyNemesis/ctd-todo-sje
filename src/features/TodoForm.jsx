import {useRef} from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import isValidTodoTitle from '../utils/todoValidation.js';

function TodoForm({onAddTodo}) {
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const inputRef = useRef();

    const handleAddTodo = (event) => {
        event.preventDefault();
       
       //.trim prevents whitespace-only todo entries
       // const todoTitle = event.target.todoTitle.value.trim();
    
        if (isValidTodoTitle(workingTodoTitle)) {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle("");
         // event.target.reset();
            inputRef.current.focus();
        }

    };

    //console.log(event.target.value);

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel 
                ref={inputRef}
                value={workingTodoTitle}
                onChange= {(event) => setWorkingTodoTitle(event.target.value)}                
                elementId="todoTitle"
                labelText="Todo"
            />

            <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>Add Todo</button>
        </form>
        
    );
}

export default TodoForm;