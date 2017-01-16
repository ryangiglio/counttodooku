import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';

import './TodoItem.css';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    // Set the initial seconds
    this.state = {
      seconds: props.todo.timerSeconds,
      active: false,
      deleting: false,
      editing: false,
    };

    autoBind(this);
  }

  componentDidMount() {
    // If it's starting as the active item
    if (this.props.isActive && !this.state.active) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    // If it's active, deactivate timer it before it's unmounted
    if (this.props.isActive) {
      // Save to state if it's not deleting
      this.stopTimer(!this.state.deleting);
    }
  }

  // When the props change
  componentWillReceiveProps(newProps) {
    
    // If it should be active
    if (newProps.isActive) {
      // If it wasn't active previously
      if (!this.props.isActive) {
        this.activate();
      } // Else it's already active (triggered by rename etc)
    } else {
      // If it was active previously
      if (this.state.active) {
        this.deactivate();
      }
    }
  }

  activate() {
    this.setState({
      active: true,
      startTimestamp: Date.now(),
    }, () => {
      this.timer = setInterval(() => {
        const secondsPassed = Math.floor((Date.now() - this.state.startTimestamp) / 1000);

        this.setState({
          seconds: this.props.todo.timerSeconds + secondsPassed,
        });
      }, 1000);
    });
    
    window.addEventListener('beforeunload', this.updateSavedTime);
  }

  deactivate(save) {
    this.setState({
      active: false,
    });
    clearInterval(this.timer);
    window.removeEventListener('beforeunload', this.updateSavedTime);

    if (save) {
      this.updateSavedTime();
    }
  }

  updateSavedTime(e) {
    const secondsPassed = Math.floor((Date.now() - this.state.startTimestamp) / 1000);

    // Update the stored seconds
    this.props.saveTime(this.props.id, this.props.todo.timerSeconds + secondsPassed);
  }

  handleCheckboxChange() {
    // Toggle the completed state
    this.props.toggleCompleted(this.props.id);
  }

  handleDelete() {
    this.setState({
      deleting: true,
    }, () => {
      this.props.removeItem(this.props.id);
    });
  }

  toggleEditing() {
    this.setState({
      editing: !this.state.editing,
    }, () => {
      // If editing
      if (this.state.editing) {
        document.addEventListener('click', this.closeEditTooltip);
        this.editInput.focus();
      } else {
        document.removeEventListener('click', this.closeEditTooltip);
      }
    });
  }

  closeEditTooltip(e) {
    if (
      // If you didn't click the input
      e.target !== this.editInput &&
      // If you didn't click the form around the input (direct parent)
      e.target !== this.editInput.parentElement) {
      this.toggleEditing();
    }
  }

  handleEdit(e) {
    e.preventDefault();

    this.toggleEditing();

    this.props.editItem(this.props.id, this.editInput.value);
  }

  render() {
    const { todo, id } = this.props;

    return (
      <li className={`row TodoItem${(todo.completed ? '--completed' : '--incomplete')}`}>
        <input className="TodoItem__checkbox" type="checkbox" id={`todo${id}`} onChange={this.handleCheckboxChange} checked={todo.completed} />
        <label className={`TodoItem__label${(todo.completed ? '--completed' : '--incomplete')}`} htmlFor={`todo${id}`}>{todo.text}</label>
        <span className="TodoItem__timer">{new Date(this.state.seconds * 1000).toISOString().substr(11, 8)}</span>
        <i className="TodoItem__mod--edit fa fa-pencil" aria-hidden="true" onClick={this.toggleEditing}></i>
        <i className="TodoItem__mod--delete fa fa-times-circle" aria-hidden="true" onClick={this.handleDelete}></i>

        { this.state.editing && 
          <form className="TodoItem__edit-form" onSubmit={this.handleEdit}>
            <input className="TodoItem__edit-text" type="text" defaultValue={todo.text} ref={(node) => { this.editInput = node }} />
          </form>
        }
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  toggleCompleted: PropTypes.func.isRequired,
  saveTime: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

export default TodoItem;
