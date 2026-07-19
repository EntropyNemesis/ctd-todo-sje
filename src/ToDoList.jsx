function ToDoList() {
    
    const todoList = [
        {id: 1, title: "prep wooden boat trim pieces"},
        {id: 2, title: "acquire replacement trailer tires"},
        {id: 3, title: "topcoat trim pieces"},
  ]
    
    return(
        <ul>{todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
    );
}

export default ToDoList;