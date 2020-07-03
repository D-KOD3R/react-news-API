import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { fetchSources, populateCurrentFeeds } from './store/actions/rootAction';
import { Layout, Menu } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Card, Avatar } from 'antd';
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
	componentDidMount() {
		this.props.fetchSources();
	}

	render() {
		return (
			<Layout>
				<div>
					<Sider
						breakpoint="lg"
						collapsedWidth="0"
						onBreakpoint={(broken) => {
							console.log(broken);
						}}
						onCollapse={(collapsed, type) => {
							console.log(collapsed, type);
						}}
						style={{
							overflow: 'auto',
							height: '100vh',
							position: 'fixed',
							left: 0,
						}}
					>
						<div className="logo" />
						<Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
							{this.props.sources.map((channel) => {
								{
									console.log(channel);
								}
								return (
									<Menu.Item
										key={channel.id}
										onClick={() => this.props.populateFeeds(channel)}
										icon={<RightOutlined />}
									>
										{channel.name}
									</Menu.Item>
								);
							})}
						</Menu>
					</Sider>
				</div>
				<Layout>
					<Header
						className="site-layout-sub-header-background"
						style={{ padding: 0, textAlign: 'center', color: 'white' }}
					>
						{this.props.channelName}
					</Header>
					<Content style={{ margin: '24px 16px 0', height: '89vh' }}>
						<div
							className="site-layout-background"
							style={{
								padding: 24,
								minHeight: 200,
								paddingLeft: '200px',
							}}
						>
							{this.props.currentFeeds.map((feed) => {
								{
									console.log(feed);
								}
								return (
									<Card news={feed} style={{ width: 1111 }}>
										<Meta title={feed.author} description={feed.description} />
									</Card>
								);
							})}
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}
const mapStoreToProps = (state) => {
	return {
		channleId: state.currentChannelID,
		channelName: state.currentChannelName,
		sources: state.newsSources,
		currentFeeds: state.currentFeeds,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSources: () => dispatch(fetchSources()),
		populateFeeds: (channel) => dispatch(populateCurrentFeeds(channel)),
	};
};
export default connect(mapStoreToProps, mapDispatchToProps)(App);
