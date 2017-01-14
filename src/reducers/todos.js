const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        text: action.text,
        completed: false,
        timerSeconds: 0, 
      };

    case 'EDIT_TODO':
      return {
        ...state,
        text: action.text,
      };

    case 'TOGGLE_COMPLETED':
      return {
        ...state,
        completed: !state.completed,
      };

    case 'UPDATE_TIMER':
      return {
        ...state,
        timerSeconds: action.newSeconds,
      };

    default:
      return state;
  }
}

const todos = (state = [], action) => {
  let index;

  switch (action.type) {
    case 'ADD_TODO':
      const newID = (state.length > 0 ? state[state.length - 1].id + 1 : 0); 
      return [
        // All the existing todos
        ...state,
        // Empty object for new todo
        todo({id: newID}, action)
      ];

    case 'EDIT_TODO':
      index = state.findIndex(todo => todo.id === action.id);

      return [
        ...state.slice(0, index),
        todo(state[index], action),
        ...state.slice(index + 1)
      ];

    case 'REMOVE_TODO':
      index = state.findIndex(todo => todo.id === action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

    case 'TOGGLE_COMPLETED':
      index = state.findIndex(todo => todo.id === action.id);

      return [
        ...state.slice(0, index),
        todo(state[index], action),
        ...state.slice(index + 1)
      ];

    case 'UPDATE_TIMER':
      index = state.findIndex(todo => todo.id === action.id);

      return [
        ...state.slice(0, index),
        todo(state[index], action),
        ...state.slice(index + 1)
      ];

    default:
      return state;
  }
}

export default todos;
