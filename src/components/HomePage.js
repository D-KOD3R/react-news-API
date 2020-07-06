import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	fetchSources,
	populateCurrentFeeds,
} from '../store/actions/rootAction';
import { Layout, Menu, Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

// Max feeds fetchable is 100 in dev mode
const maxFeeds = 100;

class HomePage extends React.Component {
	fetchMoreData = () => {
		if (this.props.currentFeeds.length >= maxFeeds) {
			return;
		}
		this.props.populateFeeds(
			{
				id: this.props.channleId,
				name: this.props.channelName,
			},
			'everything',
			false
		);
	};
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
								return (
									<Menu.Item
										key={channel.id}
										onClick={() =>
											this.props.populateFeeds(channel, 'everything', true)
										}
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
							<InfiniteScroll
								dataLength={this.props.currentFeeds.length} //This is important field to render the next data
								next={this.fetchMoreData}
								hasMore={this.props.currentFeeds.length <= maxFeeds}
								loader={<h4>Loading...</h4>}
								endMessage={
									<p style={{ textAlign: 'center' }}>
										<b>Yay! You have seen it all</b>
									</p>
								}
							>
								{this.props.currentFeeds.map((feed, index) => {
									return (
										// <Link to="/details">
										<Link
											to={{
												pathname: `details/${feed.author}`,
												query: { ...feed },
											}}
										>
											<Card key={index}>
												<Meta
													title={feed.author}
													description={feed.description}
												/>
											</Card>
										</Link>
									);
								})}
							</InfiniteScroll>
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
		populateFeeds: (channel, reqType, resetCounter) =>
			dispatch(populateCurrentFeeds(channel, reqType, resetCounter)),
	};
};

export default connect(mapStoreToProps, mapDispatchToProps)(HomePage);
