/**
 * components/TodoList.js
 * 
 * Wrapper to separate incomplete/complete todos and render them in separate lists
 */

// React
import React, { PropTypes } from 'react';

import './TodoList.css';

import TodoItemListContainer from '../containers/TodoItemListContainer';
// Styles
import './TodoList.css';

class TodoList extends React.Component {
  render() {
    // Destructure the full todo list from the props
    const { todos } = this.props;

    // Filter out the todo states
    const incompleteTodos = todos.filter(todo => !todo.completed);
    const completeTodos = todos.filter(todo => todo.completed);

    return (
      <div>
        <TodoItemListContainer
          todos={incompleteTodos} />

        <h2>Completed</h2>
        <TodoItemListContainer
          todos={completeTodos} />
      </div>
    );
  }
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;
