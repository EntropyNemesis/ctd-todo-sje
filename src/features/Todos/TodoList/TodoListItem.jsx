import TextInputWithLabel from '../../../shared/TextInputWithLabel.jsx';
import { useState } from 'react';
import { isValidTodoTitle } from '../../../utils/todoValidation.js';

function TodoListItem({todo, onCompleteTodo, onUpdateTodo}) {
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
        onUpdateTodo({...todo, title: workingTitle})  /* passes in a new object that destructures todo and sets its title equal to workingTitle*/
        setIsEditing(false);
    }

    return(
        
        <li>
            <form onSubmit={handleUpdate}>
                {isEditing ? (
                    <>
                        <TextInputWithLabel value={workingTitle} onChange={handleEdit} elementId="todoTitle" labelText="Todo" />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="button" onClick={handleUpdate} disabled={!isValidTodoTitle(workingTitle)}>Update</button>
                    </>) : (
                    <>
                        <label>
                            <input 
                                type="checkbox" 
                                id={`checkbox${todo.id}`}
                                checked={todo.isCompleted} 
                                onChange={() => onCompleteTodo(todo.id)} 
                            />
                        </label>
                        <span onClick={() => setIsEditing(true)}>{todo.title}</span>
                        
                    </>
                )}
            </form>
        </li> 
    );
};

export default TodoListItem;

/*input is self-closing. even though VS Code autocompleted a closing tag, it's cleaner to write it this way. */