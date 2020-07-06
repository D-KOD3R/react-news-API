import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NewsDetail from './components/news/NewsDetail';
import PageNotFound from './components/shared/PageNotFound';
import HomePage from './components/HomePage';
import { fetchSources } from './store/actions/rootAction';
import { connect } from 'react-redux';

class App extends React.Component {
	componentDidMount() {
		this.props.fetchSources();
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/details" component={NewsDetail} />
					<Route component={PageNotFound}></Route>
				</Switch>
			</Router>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSources: () => dispatch(fetchSources()),
	};
};
export default connect(null, mapDispatchToProps)(App);
