/**
 * components/TodoList.js
 * 
 * Wrapper to separate incomplete/complete todos and render them in separate lists
 */

// React
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';

// Components
import TodoItemList from '../components/TodoItemList';

// Styles
import './TodoList.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  handleClearCompletedClick() {
    this.props.clearCompleted();
  }

  render() {
    // Destructure the full todo list from the props
    const { todos } = this.props;

    // Filter out the todo states
    const incompleteTodos = todos.filter(todo => !todo.completed);
    const completeTodos = todos.filter(todo => todo.completed);

    return (
      <div>
        <TodoItemList
          todos={incompleteTodos} />

        <h2>Completed <span onClick={this.handleClearCompletedClick}>Clear All</span></h2>
        <TodoItemList
          todos={completeTodos} />
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default TodoList;
