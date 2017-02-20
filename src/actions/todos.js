// Add Todo
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text
  }
}

// Edit Todo
export const editTodo = (id, text) => {
  return {
    type: 'EDIT_TODO',
    id,
    text
  }
}

// Move Todo
export const moveTodo = (oldIndex, newIndex) => {
  return {
    type: 'MOVE_TODO',
    oldIndex,
    newIndex
  }
}

// Promote Todo
export const promoteTodo = (id) => {
  return {
    type: 'PROMOTE_TODO',
    id,
  }
}

// Remove Todo
export const removeTodo = (id) => {
  return {
    type: 'REMOVE_TODO',
    id 
  }
}

// Toggle Completed
export const toggleCompleted = (id) => {
  return {
    type: 'TOGGLE_COMPLETED',
    id 
  }
}

// Update Timer
export const updateTimer = (id, newSeconds) => {
  return {
    type: 'UPDATE_TIMER',
    id,
    newSeconds
  }
}

// Clear completed todos
export const clearCompleted = () => {
  return {
    type: 'CLEAR_COMPLETED',
  }
}
