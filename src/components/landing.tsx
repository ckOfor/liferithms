/* tslint:disable */
// react
import React, { useState } from 'react';
// third-party react library
import {Breadcrumb, Form, Layout} from 'antd';

// components
import CreateActivityComponentView from "./create-activity";
import ViewActivityComponentView from "./view-activity";

// common
import HeaderView from "../common/header/header";
import SideMenuView from "../common/side-menu/side-menu";

import { ICreateActivity } from "../redux/actions/user/user.d";

interface StateProps {
  data: ICreateActivity
}

// styles
const { Content } = Layout;

interface DispatchProps {
  saveActivityAsync: (data: ICreateActivity) => void
  deleteActivityAsync: (id: number) => void
  editActivityAsync: (data: ICreateActivity) => void
}

type Props = DispatchProps & StateProps

const ROOT = {
  height: '100%',
  width:  '100%',
  top: 0,
  left: 0
}

// @ts-ignore
export const LandingComponent: React.FC = (props: Props) => {
  const [selectedView, setSelectedView] = useState('create');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  /**
   * handleCollapsed
   *
   * @param isCollapsed
   */
  const handleCollapsed = (isCollapsed: boolean) => {
    setIsCollapsed(isCollapsed)
  }
  
  
  /**
   * handleSideMenuSelection
   *
   * @param item
   * @param key
   * @param keyPath
   */
  const handleSideMenuSelection = ({ item, key, keyPath }: any) => {
    setSelectedView(key)
  }
  
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div
      style={ROOT}
    >
      <HeaderView />
      <Layout
        style={{
          minHeight: '100vh'
        }}
      >
        <SideMenuView
          // user={user}
          // @ts-ignore
          handleSideMenuSelection={handleSideMenuSelection}
          isCollapsed={handleCollapsed}
          {...props}
        />
  
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} >
            {
              selectedView === 'create' && (
                // @ts-ignore
                <CreateActivityComponentView
                  // @ts-ignore
                  setSelectedView={setSelectedView}
                  {...props}
                />
              )
            }
  
            {
              selectedView === 'view' && (
                // @ts-ignore
                <ViewActivityComponentView
                  // @ts-ignore
                  isCollapsed={isCollapsed}
                  {...props}
                />
              )
            }
          </Breadcrumb>
        </Content>
      </Layout>
    </div>
  )
}

const LandingView = Form.create()(LandingComponent);

export default LandingView

