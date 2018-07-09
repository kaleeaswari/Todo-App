import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import todo from './todo'

export default combineReducers({
  todo,
  routing: routerReducer,
})
