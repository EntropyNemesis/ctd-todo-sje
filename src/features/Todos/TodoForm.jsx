import { useState, useRef } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle, TODO_TITLE_MAX_LENGTH } from '../../utils/todoValidation.js';
import styles from './TodoForm.module.css';

function TodoForm({onAddTodo}) {
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const inputRef = useRef();

    const handleAddTodo = (event) => {
        event.preventDefault();
    
        if (isValidTodoTitle(workingTodoTitle)) {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle("");
            inputRef.current.focus();
        }

    };

    return (
        <form onSubmit={handleAddTodo} className={styles.form}>
            <div className={styles.inputWrapper}>
                <TextInputWithLabel 
                    ref={inputRef}
                    value={workingTodoTitle}
                    onChange= {(event) => setWorkingTodoTitle(event.target.value)}                
                    elementId="todoTitle"
                    labelText="Todo"
                    maxLength={TODO_TITLE_MAX_LENGTH}
                />
            </div>
            <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)} className={styles.primaryButton}>Add Todo</button>
        </form>
        
    );
}

export default TodoForm;