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
