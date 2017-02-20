/**
 * components/TodoItemList.js
 * 
 * List of TodoItems
 */

// React
import React, { PropTypes } from 'react';

// Drag and Drop
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Components
import TodoItemContainer from '../containers/TodoItemContainer';

// Style
import './TodoItemList.css';

class TodoItemList extends React.Component {
  render() {
    // Destructure the filtered (by parent) todo list from the props
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
