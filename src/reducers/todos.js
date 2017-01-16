import shortId from 'shortid';

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
      // const newID = (state.length > 0 ? state[state.length - 1].id + 1 : 0); 
      const newID = shortId.generate();

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

    case 'MOVE_TODO':
      // Remove the todo from its original position
      let [ thisTodo ] = state.splice(action.oldIndex, 1);

      // Add it to its new position
      state.splice(action.newIndex, 0, thisTodo);

      return [
        ...state
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
        ...state.slice(index + 1),
        // Move to the end of the list when it's completed
        todo(state[index], action)
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
