import React, { PropTypes } from 'react';

import './TodoList.css';

import TodoItemListContainer from '../containers/TodoItemListContainer';

class TodoList extends React.Component {
  render() {
    const { todos } = this.props;

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
