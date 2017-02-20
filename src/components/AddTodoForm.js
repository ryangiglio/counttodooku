import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';

// import './AddTodoForm.css';

class AddTodoForm extends React.Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  // Function to handle form submit
  handleAddFormSubmit(e) {
    e.preventDefault();

    // If the field isn't empty
    if (!this.addInput.value.trim())
      return;

    // Add the todo via Redux action
    this.props.addItem(this.addInput.value);

    // Clear the form
    this.addInput.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleAddFormSubmit}>
        <input type="text" ref={(node) => { this.addInput = node }} />
        <button>Submit</button>
      </form>
    );
  }
};

AddTodoForm.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default AddTodoForm;
