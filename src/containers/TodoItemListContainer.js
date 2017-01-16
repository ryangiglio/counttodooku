import { connect } from 'react-redux';

import TodoItemList from '../components/TodoItemList';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const TodoItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItemList);

export default TodoItemListContainer;
