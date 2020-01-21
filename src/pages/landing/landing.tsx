// react
import React from 'react';

// third party libraries
import { connect } from 'react-redux';
import { Dispatch } from "redux";

// components
import LandingView from "../../components";

// redux
import { ApplicationState } from "../../redux/reducers";
import {deleteActivityAsync, editActivityAsync, saveActivityAsync} from "../../redux/actions";

// types
import { ICreateActivity } from "../../redux/actions/user/user.d";

interface StateProps {
  data: ICreateActivity
  isLoading: boolean
}

interface DispatchProps {
  saveActivityAsync: (data: ICreateActivity) => void
  deleteActivityAsync: (id: number) => void
  editActivityAsync: (data: ICreateActivity) => void
}

type ContainerProps = DispatchProps & StateProps

class Landing extends React.Component<ContainerProps, StateProps> {
  
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    
    return (
      <LandingView
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  saveActivityAsync: (data: ICreateActivity) => dispatch(saveActivityAsync(data)),
  deleteActivityAsync: (id: number) => dispatch(deleteActivityAsync(id)),
  editActivityAsync: (data: ICreateActivity) => dispatch(editActivityAsync(data))
});

let MapStateToProps: (state: ApplicationState) => StateProps;
MapStateToProps = (state: ApplicationState): StateProps => ({
  isLoading: state.user.loading,
  data: state.user.data,
});


export const LandingPage = connect(
  MapStateToProps,
  // @ts-ignore
  mapDispatchToProps
)(Landing);
