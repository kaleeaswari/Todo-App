import Immutable from 'immutable'

export default function todo(state = Immutable.Map(), action) {
  if (action.type === 'UPDATE_ITEMS') {
    return state.set('todos', action.payload)
  } else if (action.type === 'UPDATE_REVISION') {
    return state.set('revision', action.payload)
  } else if (action.type === 'ADD_ITEM') {
    const newItem = action.payload
    const todos = state.get('todos').concat(newItem)
    return state.set('todos', todos)
  } else if (action.type === 'DELETE_ITEM') {
    const deleteItem = action.payload
    const todos = state.get('todos').filter(item => item !== deleteItem)
    return state.set('todos', todos)
  }
  return state
}
