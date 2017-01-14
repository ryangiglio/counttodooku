import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions/todos';

// import './AddTodoForm.css';

let AddTodoForm = ({ dispatch }) => {
  let input;

  return (
    <form onSubmit={(e)=>{
        e.preventDefault();

        if (!input.value.trim()) {
          return;
        }

        dispatch(addTodo(input.value));

        input.value = '';
      }}>
      <input type="text" ref={(node) => {
          input = node
        }} />
      <button>Submit</button>
    </form>
  );
}

AddTodoForm = connect()(AddTodoForm);

export default AddTodoForm;
