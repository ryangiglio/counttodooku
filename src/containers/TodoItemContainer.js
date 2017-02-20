/**
 * containers/TodoItemContainer.js
 * 
 * TodoItem Redux container
 */

// Redux
import { connect } from 'react-redux';
import { toggleCompleted, updateTimer, moveTodo, promoteTodo, removeTodo, editTodo } from '../actions/todos';

// Components
import TodoItem from '../components/TodoItem';

// Make Redux state available to the component
const mapStateToProps = (state, ownProps) => {
  return {
    todo: state.todos.find(todo => todo.id === ownProps.id)
  }
}

// Make Redux actions available to the component
const mapDispatchToProps = (dispatch) => {
  return {
    toggleCompleted: (id) => {
      dispatch(toggleCompleted(id));
    },
    saveTime: (id, newSeconds) => {
      dispatch(updateTimer(id, newSeconds));
    },
    moveItem: (oldIndex, newIndex) => {
      dispatch(moveTodo(oldIndex, newIndex));
    },
    promoteItem: (id) => {
      dispatch(promoteTodo(id));
    },
    removeItem: (id) => {
      dispatch(removeTodo(id));
    },
    editItem: (id, text) => {
      dispatch(editTodo(id, text));
    },
  }
}

// Connect Redux to components
const TodoItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);

export default TodoItemContainer;
