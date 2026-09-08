//defining actions from todo operations
export const TODO_ACTIONS = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',

    ADD_TODO_START: 'ADD_TODO_START',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
    ADD_TODO_ERROR: 'ADD_TODO_ERROR',

    COMPLETE_TODO_START: 'COMPLETE_TODO_START',
    COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
    COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',

    UPDATE_TODO_START: 'UPDATE_TODO_START',
    UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
    UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',

    SET_SORT: 'SET_SORT',
    SET_FILTER: 'SET_FILTER',
    CLEAR_FILTER_ERROR: 'CLEAR_FILTER_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    RESET_FILTERS: 'RESET_FILTERS'
};

//state object, dictionary for reducer
export const initialTodoState = {
    todoList: [],
    error: '',
    isTodoListLoading: true,
    sortBy: 'createdAt',
    sortDirection: 'asc',
    filterTerm: '',
    dataVersion: 0,
    filterError: ''
};

//reducer function below
export function todoReducer(state, action) {
    switch (action.type) {
        case TODO_ACTIONS.FETCH_START:
            return {
                ...state,
                isTodoListLoading: true,
                error: '',
                filterError: '',
            };
        case TODO_ACTIONS.FETCH_SUCCESS:
            return {
                ...state,
                todoList: action.tasks,
                isTodoListLoading: false,
                error: '',
                filterError: '',
            };
        case TODO_ACTIONS.FETCH_ERROR:
            return {
                ...state,
                isTodoListLoading: false,
                ...(action.isFilterError 
                    ? { filterError: `Error filtering/sorting todos: ${action.error}` }
                    : { error: `Error fetching todos: ${action.error}` })  
            };
        case TODO_ACTIONS.ADD_TODO_START:
            return {
                ...state,
                todoList: [action.newTodo, ...state.todoList],
            };
        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            return {
                ...state,
                error: '',
                todoList: state.todoList.map(todo => todo.id === action.tempId ? action.todo : todo),
                dataVersion: state.dataVersion + 1
                };
        case TODO_ACTIONS.ADD_TODO_ERROR:
            return {
                ...state,
                error: action.error,
                todoList: (state.todoList.filter(todo => todo.id !== action.tempId))
            };
        case TODO_ACTIONS.COMPLETE_TODO_START:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id === action.id ? {...todo, isCompleted: true} : todo)
            };
        case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id === action.id ? action.todo : todo),
                dataVersion: state.dataVersion + 1,
                error: '',
                };
        case TODO_ACTIONS.COMPLETE_TODO_ERROR:
            return {
                ...state,
                error: action.error,
                todoList: state.todoList.map(todo => todo.id === action.id ? action.originalTodo : todo)
            };
        case TODO_ACTIONS.UPDATE_TODO_START:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id === action.editedTodo.id ? {...action.editedTodo} : todo)
            };
        case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id === action.todo.id ? action.todo : todo),
                error: '',
                dataVersion: state.dataVersion + 1
            };
        case TODO_ACTIONS.UPDATE_TODO_ERROR:
            return {
                ...state,
                error: action.error,
                todoList: state.todoList.map(todo => todo.id === action.originalTodo.id ? action.originalTodo : todo)
            };
        case TODO_ACTIONS.SET_SORT:
            return {
                ...state,
                sortBy: action.sortBy,
                sortDirection: action.sortDirection
            };
        case TODO_ACTIONS.SET_FILTER:
            return {
                ...state,
                filterTerm: action.filterTerm
            };
        case TODO_ACTIONS.CLEAR_FILTER_ERROR:
            return {
                ...state,
                filterError: ''
            }
        case TODO_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: ''
            };
        case TODO_ACTIONS.RESET_FILTERS:
            return {
                ...state,
                filterTerm: '',
                sortBy: 'createdAt',
                sortDirection: 'asc',
                filterError: ''
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);                
    }
}