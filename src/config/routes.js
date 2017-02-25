/**
 * config/routes.js
 * 
 * Set up routes
 */

// React
import React from 'react';
import { Router, Route } from 'react-router';

// Redux
import { Provider } from 'react-redux';
import store, { history } from './store';

// Components
import App from '../components/App';
import About from '../components/About';

/**
 * The whole app is wrapped in a store provider since there's only the one route and the store should always be accessible via that route
 */
const routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/about" component={About} />
      </Route>
    </Router>
  </Provider>
);

export default routes;
