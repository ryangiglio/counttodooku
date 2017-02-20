/**
 * components/TodoItem.js
 * 
 * TodoItem component
 * This one's a doozy!
 *
 * NOTE: I realize updating the timer as component state rather than updating the Redux store and letting it cascade is generally an anti-pattern. I'm doing it anyway for two reasons:
 * 1) The timer ticks every second and I didn't want to be constantly updating the state
 * 2) I want the timer displayed to be as accurate as possible - if this app were updated to use a remotely stored database rather than local storage, the timer wouldn't update until the async call was finished and the state was updated.
 *
 * As such there's a lot of gymnastics here to make sure it only saves to the Redux store when necessary to not lose the data. Is all that worth it? Maybe not, but it was an interesting puzzle to solve.
 */

// React
import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import autoBind from 'react-autobind';

// Drag and Drop
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash'; // Allow cascading higher order components

// Style
import './TodoItem.css';

/**
 * React DnD setup
 */

// Drag and Drop "source"
const todoItemSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { index: props.index };

    return item;
  }
};

// Drag and Drop "target"
const todoItemTarget = {
  hover(props, monitor, component) {
    // console.log(props);
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    component.props.moveItem(dragIndex, hoverIndex);

    /*
    // If we dragged from the active position and dropped off of active
    if (dragIndex === 0 && hoverIndex > 0) {
      this.stopTimer(true);
    }
    */

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const sourceCollect = (connect, monitor) => {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
};

const targetCollect = (connect) => {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget()
  };
};

/**
 * Main TodoItem component
 */
class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial seconds
      // NOTE: This state ONLY reflects what time is being displayed. It isn't mirrored by the Redux store. For more info see the note at the top of this file 
      seconds: props.todo.timerSeconds,
      active: false,
      deleting: false,
      editing: false,
    };

    autoBind(this);
  }

  componentDidMount() {
    if (
      // If it's first in the array and passed the isActive prop &&
      this.props.isActive &&
      // It isn't already active because of a remount
      !this.state.active) {
      // Start the timer
      this.startTimer();
    }
  }

  componentWillUnmount() {
    // If it's active
    if (this.props.isActive) {
      // Stop the timer before it's unmounted and save the state IF it's not being unmounted because of a delete
      this.stopTimer(!this.state.deleting);
    }
  }

  // When the props change
  componentWillReceiveProps(newProps) {
    // If it's first in the array and passed the isActive prop
    if (newProps.isActive) {
      // If it was just moved to first and wasn't previously active
      if (!this.props.isActive) {
        // Start the timer
        this.startTimer();
      }
    } else { // It isn't first and shouldn't be active
      // If it was active previously or it's being dragged out of active
      if (this.state.active) {
        // Stop the timer and save the time
        this.stopTimer(true);
      }
    }
  }

  // Function to start the timer ticking
  startTimer() {
    this.setState({
      active: true, // Set active flag
      startTimestamp: Date.now(), // Save timestamp of start time to do math with
    }, () => { // Once the state has been set
      // Save the timer interval to the object
      this.timer = setInterval(() => {
        // Calculate how many seconds have passed since the last tick
        // NOTE: Not just incrementing here because if there's a processing delay, or, more importantly, if the user tabbed out of the browser and the execution paused, it will have been many more than 1 second
        const secondsPassed = Math.floor((Date.now() - this.state.startTimestamp) / 1000);

        // Update the seconds
        this.setState({
          seconds: this.props.todo.timerSeconds + secondsPassed,
        });
      }, 1000);
    });
    
    // Add listener to save the time if the window is closed
    window.addEventListener('beforeunload', this.updateSavedTime);
  }

  // Function to stop the timer ticking
  stopTimer(save) {
    this.setState({
      active: false, // Unset active flag
    });

    // Remove the timer interval
    clearInterval(this.timer);

    // Remove listener to save the time if the window is closed
    window.removeEventListener('beforeunload', this.updateSavedTime);

    // If we should also save (it isn't being deleted)
    if (save) {
      // Save the time
      this.updateSavedTime();
    }
  }

  // Function to save the new time to the Redux store
  updateSavedTime(e) {
    // Recalculate how many seconds have passed since the timer started
    // NOTE: This doesn't simply use this.state.seconds because if the page was backgrounded for a while and closed immediately, this.state.seconds is no longer correct
    const secondsPassed = Math.floor((Date.now() - this.state.startTimestamp) / 1000);

    // Update the stored seconds via Redux action
    this.props.saveTime(this.props.id, this.props.todo.timerSeconds + secondsPassed);
  }

  // Function to handle "completed" checkbox
  handleCheckboxChange() {
    // Toggle the completed state
    this.props.toggleCompleted(this.props.id);
  }

  // Function to handle "delete" button
  handleDelete() {
    this.setState({
      deleting: true, // Set deleting flag so we don't save the seconds in componentWillUnmount
    }, () => {
      // Remove the item via Redux action
      this.props.removeItem(this.props.id);
    });
  }

  // Function to toggle the edit form
  toggleEditing() {
    this.setState({
      editing: !this.state.editing, // Flip the flag that displays the form
    }, () => {
      // If editing
      if (this.state.editing) {
        // Add event listener to close the tooltip if you click anywhere
        document.addEventListener('click', this.closeEditTooltip);
        // Focus the form input
        this.editInput.focus();
      } else {
        // Remove event listener to close the tooltip if you click anywhere
        document.removeEventListener('click', this.closeEditTooltip);
      }
    });
  }

  // Function to close the edit form on click
  closeEditTooltip(e) {
    if (
      // If you didn't click the input
      e.target !== this.editInput &&
      // If you didn't click the form around the input (direct parent)
      e.target !== this.editInput.parentElement) {
      this.toggleEditing();
    }
  }

  // Function to handle edit form submit
  handleEdit(e) {
    e.preventDefault();

    // Stop editing
    this.toggleEditing();

    // Save the new value via Redux action
    this.props.editItem(this.props.id, this.editInput.value);
  }

  // Function to handle edit form submit
  handlePromote(e) {
    e.preventDefault();

    // Save the new value via Redux action
    this.props.promoteItem(this.props.id);
  }

  render() {
    const { todo, id, connectDragSource, connectDragPreview, connectDropTarget, isDragging } = this.props;

    return (

      connectDragPreview(connectDropTarget(
        <li className={`row TodoItem${(todo.completed ? '--completed' : '--incomplete')}`} style={{ opacity: (isDragging ? 0 : 1) }}>
          <input className="TodoItem__checkbox" type="checkbox" id={`todo${id}`} onChange={this.handleCheckboxChange} checked={todo.completed} />
          <label className={`TodoItem__label${(todo.completed ? '--completed' : '--incomplete')}`} htmlFor={`todo${id}`}>{todo.text}</label>
          <span className="TodoItem__timer">{new Date(this.state.seconds * 1000).toISOString().substr(11, 8)}</span>
          { !todo.completed && <i className="TodoItem__mod--edit fa fa-pencil" aria-hidden="true" title="Edit Text" onClick={this.toggleEditing}></i> }
          { !todo.completed && connectDragSource(<i className="TodoItem__mod--sort fa fa-sort" title="Drag to Reorder" aria-hidden="true"></i>) }
          { !todo.completed && <i className="TodoItem__mod--promote fa fa-arrow-up" aria-hidden="true" title="Move to Top" onClick={this.handlePromote}></i> }
          <i className="TodoItem__mod--delete fa fa-times-circle" aria-hidden="true" title="Delete Todo" onClick={this.handleDelete}></i>

          { this.state.editing && 
            <form className="TodoItem__edit-form" onSubmit={this.handleEdit}>
              <input className="TodoItem__edit-text" type="text" defaultValue={todo.text} ref={(node) => { this.editInput = node }} />
            </form>
          }
        </li>
      )
    ))
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  toggleCompleted: PropTypes.func.isRequired,
  saveTime: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

// Cascade React DnD higher order components
export default flow(
  DragSource('TODO_ITEM', todoItemSource, sourceCollect),
  DropTarget('TODO_ITEM', todoItemTarget, targetCollect)
)(TodoItem);
