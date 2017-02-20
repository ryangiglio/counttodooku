/**
 * /index.js
 * 
 * Sets up React on the root element
 */

// React
import { render } from 'react-dom';

// Router
import routes from './config/routes.js';

render(
  routes,
  document.getElementById('root')
);
