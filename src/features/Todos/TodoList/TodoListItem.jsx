import TextInputWithLabel from '../../../shared/TextInputWithLabel.jsx';
import { useState } from 'react';
import { isValidTodoTitle, TODO_TITLE_MAX_LENGTH } from '../../../utils/todoValidation.js';
import styles from './TodoListItem.module.css';

function TodoListItem({todo, onCompleteTodo, onUpdateTodo, onDeleteTodo}) {
    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);

    function handleCancel() {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    }

    function handleEdit(event) {
        setWorkingTitle(event.target.value);
    }

    function handleUpdate(event) {
        event.preventDefault();
        if (!isEditing) return;                       /* if isEditing is false, immediately exit the function and skip to return */
        if (!isValidTodoTitle(workingTitle)) return;    //checks validity of updated input
        onUpdateTodo({...todo, title: workingTitle})  /* passes in a new object that destructures todo and sets its title equal to workingTitle*/
        setIsEditing(false);
    }

    return(
        
        <li>
            <form onSubmit={handleUpdate} className={styles.item}>
                {isEditing ? (
                    <>
                        <div className={styles.inputWrapper}>
                            <TextInputWithLabel
                                value={workingTitle}
                                onChange={handleEdit}
                                elementId="todoTitle"
                                labelText="Todo"
                                maxLength={TODO_TITLE_MAX_LENGTH}
                            />
                        </div>
                        <button type="button" onClick={handleCancel} className={styles.secondaryButton}>Cancel</button>
                        <button type="button" onClick={handleUpdate} disabled={!isValidTodoTitle(workingTitle)} className={styles.secondaryButton}>Update</button>
                        <button type="button" onClick={() => onDeleteTodo(todo.id)} className={styles.secondaryButton}>Delete</button>
                    </>) : (
                    <>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                id={`checkbox${todo.id}`}
                                checked={todo.isCompleted}
                                onChange={() => onCompleteTodo(todo.id)}
                                className={styles.checkbox}
                            />
                        </label>
                        <span onClick={() => setIsEditing(true)} className={styles.title}>
                            {todo.title}
                        </span>
                    </>
                )}
            </form>
        </li> 
    );
};

export default TodoListItem;

/*input is self-closing. even though VS Code autocompleted a closing tag, it's cleaner to write it this way. */