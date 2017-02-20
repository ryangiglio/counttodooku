/**
 * components/App.js
 * 
 * Main app component
 */

// React
import React from 'react';

// Components
import TodoListContainer from '../containers/TodoListContainer';
import AddTodoFormContainer from '../containers/AddTodoFormContainer';

// Style
import 'normalize.css';
import './App.css';
import dooku from '../assets/little-dooku.jpg';

const App = () => {
  return (
    <div className="container">
      <h1 className="logo">
        <span className="logo__word">Count</span>
        <img className="logo__image" src={dooku} alt="Count Dooku" />
        <span className="logo__word">Todo(oku)</span>
      </h1>
      <TodoListContainer />
      <AddTodoFormContainer />
    </div>
  );
}

export default App;
