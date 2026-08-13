import TextInputWithLabel from '/src/shared/TextInputWithLabel.jsx';
import { useState } from 'react';

function TodoListItem({todo, onCompleteTodo}) {
    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);

    function handleCancel() {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    }

    return(
        
        <li>
            <form>
                {isEditing ? (
                    <>
                        <TextInputWithLabel value={todo.title}/>
                        <button type="button" onClick={handleCancel}>Cancel</button>
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