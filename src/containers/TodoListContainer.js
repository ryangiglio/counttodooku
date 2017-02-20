/**
 * containers/TodoListContainer.js
 * 
 * TodoList Redux container
 */

// Redux
import { connect } from 'react-redux';
import { clearCompleted } from '../actions/todos';

// Components
import TodoList from '../components/TodoList';

// Make Redux state available to the component
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo
  }
}

// Connect Redux to components
const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListContainer;
