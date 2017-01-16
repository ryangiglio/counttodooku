import { connect } from 'react-redux';

import TodoItem from '../components/TodoItem';

import { toggleCompleted, updateTimer, moveTodo, removeTodo, editTodo } from '../actions/todos';

const mapStateToProps = (state, ownProps) => {
  return {
    todo: state.todos.find(todo => todo.id === ownProps.id)
  }
}

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
    removeItem: (id) => {
      dispatch(removeTodo(id));
    },
    editItem: (id, text) => {
      dispatch(editTodo(id, text));
    }
  }
}

const TodoItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);

export default TodoItemContainer;
