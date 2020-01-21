// react
import React  from 'react';

// third-party library
import { Layout, Form } from 'antd';

const { Header } = Layout;

// @ts-ignore
export const HeaderPage: React.FC = (props: Props) => {

	return (
		<Header>
			<div>
				<h3
					style={{
						paddingTop: 20,
						color: '#FFFFFF',
						fontFamily: 'Rockwell',
						fontSize: 20
					}}
				>
					Liferithms
				</h3>
			</div>
		</Header>
	)
}

const HeaderView = Form.create()(HeaderPage);

export default HeaderView
