import React, { PropTypes } from 'react';

import './TodoList.css';

import TodoItemContainer from '../containers/TodoItemContainer';

class TodoList extends React.Component {
  render() {
    const { todos } = this.props;

    const incompleteTodos = todos.filter(todo => !todo.completed);
    const completeTodos = todos.filter(todo => todo.completed);

    return (
      <div>
        <ol className="TodoList">
          {incompleteTodos.map((todo, index)=>{
              return (
                <TodoItemContainer
                  key={todo.id}
                  id={todo.id}
                  isActive={index === 0} />
              );
          })}
        </ol>
        <h2>Completed</h2>
        <ol className="TodoList">
          {completeTodos.map((todo, index)=>{

            return (
              <TodoItemContainer
                key={todo.id}
                id={todo.id}
                isActive={false} />
            )
          })}
        </ol>
      </div>
    );
  }
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;
