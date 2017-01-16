import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './TodoItemList.css';

import TodoItemContainer from '../containers/TodoItemContainer';

class TodoItemList extends React.Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    const { todos } = this.props;

    return (
      <ol className="TodoItemList">
        {todos.map((todo, index)=>{
          return (
            <TodoItemContainer
              key={todo.id}
              id={todo.id}
              index={index}
              isActive={!todo.completed && index === 0 } />
          );
        })}
      </ol>
    );
  }
};

TodoItemList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default DragDropContext(HTML5Backend)(TodoItemList);
