import {
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_FAILURE, DELETE_ACTIVITY_SUCCESS, EDIT_ACTIVITY, EDIT_ACTIVITY_FAILURE, EDIT_ACTIVITY_SUCCESS,
  SAVE_ACTIVITY, SAVE_ACTIVITY_FAILURE, SAVE_ACTIVITY_SUCCESS, SAVE_ACTIVITY_TO_STORAGE, SET_ACTIVITY_STORAGE
} from '../../actionTypes/userTypes';
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { ApplicationState } from "../../reducers";
import { message, notification } from 'antd';
import { ICreateActivity } from "./user.d";
import moment from "moment";
const _ = require('lodash');

export const saveActivityToStorage = (payload: ICreateActivity) => ({
  type: SAVE_ACTIVITY_TO_STORAGE,
  payload
});

export const saveActivity = () => ({
  type: SAVE_ACTIVITY
});

export const saveActivityFailure = () => ({
  type: SAVE_ACTIVITY_FAILURE
});

export const saveActivitySuccess = () => ({
  type: SAVE_ACTIVITY_SUCCESS
});

/**
 * Thunks
 */
export const saveActivityAsync = (data: ICreateActivity): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  const activities = getState().user.data
  const id = activities.length + 1

  const newData = {
    ...data,
    id,
  }
  
  dispatch(saveActivity())
  const hide = message.loading('Saving...', 0);

  try {
    dispatch(saveActivityToStorage(newData))
    dispatch(notify("Success!", 'Activity saved successfully', "success"))
    setTimeout(hide, 1000);
    dispatch(saveActivitySuccess())
  } catch ({message}) {
    dispatch(saveActivityFailure())
    dispatch(notify("Sorry :(", message, "error"))
    setTimeout(hide, 1000);
  }
}

export const deleteActivity = () => ({
  type: DELETE_ACTIVITY
});

export const deleteActivityFailure = () => ({
  type: DELETE_ACTIVITY_FAILURE
});

export const deleteActivitySuccess = () => ({
  type: DELETE_ACTIVITY_SUCCESS
});

export const setActivityToStorage = (payload: ICreateActivity) => ({
  type: SET_ACTIVITY_STORAGE,
  payload
});


/**
 * Thunks
 */
export const deleteActivityAsync = (id: number): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  const hide = message.loading('Saving...', 0);
  dispatch(deleteActivity())
  
  const activities = getState().user.data
  const newArray = activities.filter((activity: { id: number; }) => activity.id !== id);
  
  try {
    dispatch(setActivityToStorage(newArray))
    dispatch(notify("Success!", 'Activity deleted successfully', "success"))
    setTimeout(hide, 1000);
    dispatch(deleteActivitySuccess())
  } catch ({message}) {
    dispatch(deleteActivityFailure())
    dispatch(notify("Sorry :(", message, "error"))
    setTimeout(hide, 1000);
  }
}

export const editActivity = () => ({
  type: EDIT_ACTIVITY
});

export const editActivityFailure = () => ({
  type: EDIT_ACTIVITY_FAILURE
});

export const editActivitySuccess = () => ({
  type: EDIT_ACTIVITY_SUCCESS
});

/**
 * Thunks
 */
export const editActivityAsync = (data: ICreateActivity): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  const activities = getState().user.data
  
  const foundIndex = activities.findIndex((activity: { id: number; }) => activity.id === data.id);
  activities[foundIndex] = data;
  
  
  const hide = message.loading('Saving...', 0);
  dispatch(editActivity())

  try {
    dispatch(setActivityToStorage(activities))
    dispatch(notify("Success!", 'Activity edited successfully', "success"))
    setTimeout(hide, 1000);
    dispatch(editActivitySuccess())
  } catch ({message}) {
    dispatch(editActivityFailure())
    dispatch(notify("Sorry :(", message, "error"))
    setTimeout(hide, 1000);
  }
}

/**
 * Thunks
 */
export const notify = (heading: string, message: string, type: string): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async () => {
  // @ts-ignore
  notification[`${type}`]({
    message: `${heading}`,
    description: `${message}`,
    style: {
      width: '100%',
    },
  });
}
