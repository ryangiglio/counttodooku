/**
 * reducers/index.js
 * 
 * Create root reducer
 */

// Redux
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import todos from './todos';

// Combine reducers
const rootReducer = combineReducers({
  todos,
  routing: routerReducer
});

export default rootReducer;
