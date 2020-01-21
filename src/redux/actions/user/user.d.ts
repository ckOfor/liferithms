export interface ICreateActivity {
  id: number
  name: string
  description: string
  startTime: string
  endTime: string
  dateCreated: string
  dateUpdated: string
}

export interface UserState {
  data: [];
  loading: boolean
}

export interface UserAction {
  type: string;
  payload: any;
}

export type UserTypes = UserAction;

