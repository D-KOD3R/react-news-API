const initialState = {
	currentChannelID: null,
	currentChannelName: null,
	currentPage: 1,
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
			if (action.resetCounter) {
				newState.currentFeeds = [...action.newsArticles];
			} else {
				newState.currentFeeds = [
					...newState.currentFeeds,
					...action.newsArticles,
				];
			}

			newState.currentPage = action.currentPage;
			return newState;
		}
		default: {
		}
	}
	return newState;
};

export default newsReducer;
