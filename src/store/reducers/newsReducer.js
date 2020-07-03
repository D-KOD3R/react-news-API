const initialState = {
	currentChannelID: null,
	currentChannelName: null,
	newsSources: [],
	currentFeeds: [],
};

const newsReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case 'SET_SOURCES': {
			newState.newsSources = action.result;
			return newState;
		}
		case 'POPULATE_ARTICLES': {
			newState.currentChannelID = action.channelId;
			newState.currentChannelName = action.channelName;
			newState.currentFeeds = action.newsArticles;
			return newState;
		}
		default: {
		}
	}
	return newState;
};

export default newsReducer;
