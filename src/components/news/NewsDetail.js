import React from 'react';
import { Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';
const { Meta } = Card;

const NewsDetail = (props) => {
	return (
		<div className="news-detail">
			{console.log(props)}
			<Card
				style={{ width: 1000 }}
				cover={
					<img alt="newsImg" src={props.history.location.query.urlToImage} />
				}
				actions={[
					<Link to="/">Go back </Link>,
					<Link to="/">Top News </Link>,
					<Link to={props.history.location.query.url}>Checkout website</Link>,
				]}
			>
				<Meta
					title={props.history.location.query.title}
					description={props.history.location.query.description}
				/>
			</Card>
		</div>
	);
};

export default NewsDetail;
