/**
 * reducers/todos.js
 * 
 * Reducers for the Todo list array and individual Todos
 */

import shortId from 'shortid'; // Generate unique ID keys
import { findIndex } from 'lodash'; // Allow cascading higher order components

// Individual Todo reducer
const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        // New ID
        ...state, 

        // Passed values
        text: action.text,

        // Default values
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

// Todo array reducer
const todos = (state = [], action) => {
  let index;

  switch (action.type) {
    case 'ADD_TODO':
      const newID = shortId.generate();

      // Find the first completed todo's index
      const firstCompletedIndex = findIndex(state, (todo) => todo.completed);

      // If there are 0 completed todos
      if (firstCompletedIndex === -1) {
        // Add the new todo to the end
        return [
          // All the existing todos
          ...state,

          // Empty object for new todo
          todo({id: newID}, action)
        ];
      } else {
        // Insert the new Todo at the end of the 'incomplete' section
        return [
          // All the incomplete todos
          ...state.slice(0, firstCompletedIndex),

          // Empty object for new todo
          todo({id: newID}, action),

          // All the complete todos
          ...state.slice(firstCompletedIndex)
        ]
      }

    case 'EDIT_TODO':
      // Find the todo by ID
      index = state.findIndex(todo => todo.id === action.id);

      return [
        // All the todos before this todo
        ...state.slice(0, index),

        // Edit this todo
        todo(state[index], action),

        // All the todos after this todo
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
      // Find the todo by ID
      index = state.findIndex(todo => todo.id === action.id);

      return [
        // All the todos before this todo
        ...state.slice(0, index),

        // All the todos after this todo
        ...state.slice(index + 1)
      ];

    case 'TOGGLE_COMPLETED':
      // Find the todo by ID
      index = state.findIndex(todo => todo.id === action.id);

      return [
        // All the todos before this todo
        ...state.slice(0, index),

        // All the todos after this todo
        ...state.slice(index + 1),

        // Move this todo to the end of the list when it's completed
        todo(state[index], action)
      ];

    case 'UPDATE_TIMER':
      // Find the todo by ID
      index = state.findIndex(todo => todo.id === action.id);

      return [
        // All the todos before this todo
        ...state.slice(0, index),

        // Update this todo in place
        todo(state[index], action),

        // All the todos before this todo
        ...state.slice(index + 1)
      ];

    case 'CLEAR_COMPLETED':
      // Get all the todos that haven't been completed
      const incompleteTodos = state.filter(todo => !todo.completed);

      return [
        // Only return those
        ...incompleteTodos
      ];

    default:
      return state;
  }
}

export default todos;
