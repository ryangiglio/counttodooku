/**
 * components/App.js
 * 
 * Main app component
 */

// React
import React from 'react';
import { Link } from 'react-router';

// Components
import TodoListContainer from '../containers/TodoListContainer';
import AddTodoFormContainer from '../containers/AddTodoFormContainer';

// Style
import 'normalize.css';
import './App.css';
import dooku from '../assets/little-dooku.jpg';

const App = (props) => {
  return (
    <div className="container">
      <h1 className="logo">
        <span className="logo__word">Count</span>
        <img className="logo__image" src={dooku} alt="Count Dooku" />
        <span className="logo__word">Todo(oku)</span>
      </h1>
      <TodoListContainer />
      <AddTodoFormContainer />
      {props.children} 
      <footer className="site-footer">
        Built by: <a className="site-footer__link" href="http://ryangiglio.com" target="_blank">Ryan Giglio</a> | <Link className="site-footer__link" to="/about">What is this?</Link>
      </footer>
    </div>
  );
}

export default App;
