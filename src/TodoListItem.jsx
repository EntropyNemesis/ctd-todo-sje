function TodoListItem({todo, onCompleteTodo}) {


    return(
        <li>
            <input type="checkbox" checked={todo.isCompleted} onChange={() => onCompleteTodo(todo.id)} />
            {todo.title}
        </li>
    );
};

export default TodoListItem;

/*input is self-closing. even though VS Code autocompleted a closing tag, it's cleaner to write it this way. */