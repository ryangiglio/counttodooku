/**
 * containers/AddTodoFormContainer.js
 * 
 * AddTodoForm Redux container
 */

// Redux
import { connect } from 'react-redux';
import { addTodo } from '../actions/todos';

// Components
import AddTodoForm from '../components/AddTodoForm';

// Make Redux state available to the component
const mapStateToProps = (state) => {
  return {
  }
}

// Make Redux actions available to the component
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (text) => {
      dispatch(addTodo(text));
    },
  }
}

// Connect Redux to components
const AddTodoFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodoForm);

export default AddTodoFormContainer;
