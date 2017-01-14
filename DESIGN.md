store structure

store: {
  todos: [
    {
      id: number,
      text: string,
      completed: bool,
      timerSeconds: number,
    },
    ...
  ],
  visibilityFilter: string
}

reducers

todos
  ADD_NEW
  TOGGLE_COMPLETE
  UPDATE_TIMER

  todo
    ADD_NEW
    TOGGLE_COMPLETE
    UPDATE_TIMER

visibilityFilter
  SET_FILTER
