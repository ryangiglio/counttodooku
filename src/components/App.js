import React from 'react';

import './App.css';

import TodoListContainer from '../containers/TodoListContainer';
import AddTodoForm from '../components/AddTodoForm';

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
