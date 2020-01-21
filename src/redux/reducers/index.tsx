import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import userReducer from './user';

export interface ApplicationState {
  nav: any
  user: any
  router: any
}

const createRootReducer = (history: any) => combineReducers({
  user: userReducer,
  router: connectRouter(history),
})
export default createRootReducer
