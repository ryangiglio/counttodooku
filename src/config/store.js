/**
 * config/store.js
 * 
 * Set up Redux store
 */

// React
import { browserHistory } from 'react-router';

// Redux
import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';

// Reducers
import rootReducer from '../reducers/index';

// Default state of the store, an empty list
const defaultState = {
  todos: [],
}

// Set up the store conditionally depending on the environment
// NOTE: This is one long ternary if statement
const store =
  // If it's not production &&
  process.env.NODE_ENV !== 'production' &&
  // We have access to the window object &&
  typeof window === 'object' &&
  // The Redux dev tools are available
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    // Create the store with the dev tools enabled
    createStore(
      rootReducer,
      defaultState,
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(autoRehydrate())
    )
  :
    // Else create the store with no dev tools
    createStore(rootReducer, defaultState, autoRehydrate())

// Make the store persist
persistStore(store);

// Save the history in the store and export for the router
export const history = syncHistoryWithStore(browserHistory, store);

export default store;
