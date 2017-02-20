/**
 * components/App.js
 * 
 * Main app component
 */

// React
import React from 'react';

// Components
import TodoListContainer from '../containers/TodoListContainer';
import AddTodoForm from '../components/AddTodoForm';

// Style
import './App.css';

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h1>Count Todooku</h1>
          <TodoListContainer />
          <AddTodoForm />
        </div>
      </div>
    </div>
  );
}

export default App;
