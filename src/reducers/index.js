import { combineReducers } from 'redux'
import Counter from './Content/ContentReducer'
import Login from './Login/LoginReducer'

export default combineReducers({
  Counter,
  Login
})
