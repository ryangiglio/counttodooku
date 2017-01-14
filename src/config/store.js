import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { browserHistory } from 'react-router';

// Import the root reducer
import rootReducer from '../reducers/index';

const defaultState = {
  todos: [],
  visibilityFilter: 'ALL',
}

const store =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    createStore(
      rootReducer,
      defaultState,
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(autoRehydrate())
    )
  :
    createStore(rootReducer, defaultState, autoRehydrate())

  persistStore(store);

export default store;

export const history = syncHistoryWithStore(browserHistory, store);
