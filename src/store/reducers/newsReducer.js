const initialState = {
	currentNewsChannel: null,
	newsFeeds: [],
};

const newsReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case 'SET_FEEDS': {
			return newState;
		}
	}
};

export default newsReducer;
