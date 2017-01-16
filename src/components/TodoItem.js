import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import autoBind from 'react-autobind';

import { DragSource, DropTarget } from 'react-dnd';

import { flow } from 'lodash';

import './TodoItem.css';

const todoItemSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { index: props.index };

    return item;
  }
};

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
        this.startTimer();
      } // Else it's already active (triggered by rename etc)
    } else {
      // If it was active previously or it's being dragged out of active
      if (this.state.active) {
        this.stopTimer(true);
      }
    }
  }

  startTimer() {
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

  stopTimer(save) {
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
    const { todo, id, connectDragSource, connectDragPreview, connectDropTarget, isDragging } = this.props;

    return (
      connectDragPreview(connectDropTarget(
        <li className={`row TodoItem${(todo.completed ? '--completed' : '--incomplete')}`} style={{ opacity: (isDragging ? 0 : 1) }}>
          <input className="TodoItem__checkbox" type="checkbox" id={`todo${id}`} onChange={this.handleCheckboxChange} checked={todo.completed} />
          <label className={`TodoItem__label${(todo.completed ? '--completed' : '--incomplete')}`} htmlFor={`todo${id}`}>{todo.text}</label>
          <span className="TodoItem__timer">{new Date(this.state.seconds * 1000).toISOString().substr(11, 8)}</span>
          <i className="TodoItem__mod--edit fa fa-pencil" aria-hidden="true" onClick={this.toggleEditing}></i>
          <i className="TodoItem__mod--delete fa fa-times-circle" aria-hidden="true" onClick={this.handleDelete}></i>
          {connectDragSource(
            <i className="TodoItem__mod--sort fa fa-sort" aria-hidden="true"></i>
          )}
          

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

export default flow(
  DragSource('TODO_ITEM', todoItemSource, sourceCollect),
  DropTarget('TODO_ITEM', todoItemTarget, targetCollect)
)(TodoItem);
