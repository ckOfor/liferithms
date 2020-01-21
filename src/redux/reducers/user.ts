import {
  DELETE_ACTIVITY, DELETE_ACTIVITY_FAILURE, DELETE_ACTIVITY_SUCCESS,
  SAVE_ACTIVITY, SAVE_ACTIVITY_FAILURE, SAVE_ACTIVITY_SUCCESS, SAVE_ACTIVITY_TO_STORAGE, SET_ACTIVITY_STORAGE,
} from '../actionTypes/userTypes';
import { UserState, UserTypes } from '../actions/user/user.d';

const INITIAL_STATE: UserState = {
  data: [],
  loading: false
};

function userReducer(state = INITIAL_STATE, action: UserTypes): UserState {
  switch (action.type) {

    case SAVE_ACTIVITY:
    case DELETE_ACTIVITY:
      return {
        ...state,
        loading: true,
      };
  
    case SAVE_ACTIVITY_FAILURE:
    case SAVE_ACTIVITY_SUCCESS:
    case DELETE_ACTIVITY_FAILURE:
    case DELETE_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
      
    case SAVE_ACTIVITY_TO_STORAGE:
      return {
        loading: false,
        ...state,
        // @ts-ignore
        data: [...state.data, action.payload]
      }
  
    case SET_ACTIVITY_STORAGE:
      return {
        loading: false,
        ...state,
        data: action.payload
      }

    default:
      return state;
  }
}

export default userReducer;
