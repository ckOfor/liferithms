// react
import React, { useState } from 'react';

// third-party library
import { Layout, Menu, Icon, Form } from 'antd';

const {
  Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

interface Props {
  handleSideMenuSelection: () => void;
  isCollapsed: any;
}

// @ts-ignore
export const SideMenu: React.FC = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    handleSideMenuSelection
  } = props
  
  const onCollapse = (collapsed: any) => {
    const { isCollapsed } = props
    setCollapsed(collapsed)
    isCollapsed(collapsed)
  }

	return (
		<Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={[`create`]}
          mode="inline"
        >
          <Menu.Item
            onClick={handleSideMenuSelection}
            key="create"
          >
            <Icon
              type="edit"
            />
            <span>
              Create
            </span>
          </Menu.Item>
  
          <Menu.Item
            onClick={handleSideMenuSelection}
            key="view"
          >
            <Icon
              type="eye"
            />
            <span>
              View
            </span>
          </Menu.Item>
        </Menu>
		</Sider>
	)
}

const SideMenuView = Form.create()(SideMenu);

export default SideMenuView
