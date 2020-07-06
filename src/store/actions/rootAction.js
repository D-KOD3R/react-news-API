// getSources = newsapi.get_sources(country: 'us', language: 'en')

// topHeadlines = newsapi.get_top_headlines(q: 'bitcoin',
//                                           sources: 'bbc-news,the-verge',
//                                           category: 'business',
//                                           language: 'en',
//                                           country: 'us')

// allArticles = newsapi.get_everything(q: 'bitcoin',
//                                       sources: 'bbc-news,the-verge',
//                                       domains: 'bbc.co.uk,techcrunch.com',
//                                       from: '2017-12-01',
//                                       to: '2017-12-12',
//                                       language: 'en',
//                                       sortBy: 'relevancy',
//                                       page: 2))

import axios from 'axios';
const instance = axios.create({
	baseURL: 'https://newsapi.org/v2',
	timeout: 2000,
});

export const fetchSources = () => {
	return async (dispatch) => {
		await instance
			.get('/sources?apiKey=6f1b98b92f7243a9a2f83cc89503b28a')
			.then((response) => {
				if (response.status === 200) {
					dispatch(
						populateCurrentFeeds(response.data.sources[0], 'everything', true)
					);
					dispatch({ type: 'SET_SOURCES', result: response.data.sources });
				}
			})
			.catch(function (error) {
				alert(error);
			});
	};
};

export const populateCurrentFeeds = (
	channel,
	section = 'everything',
	resetCounter = false
) => {
	console.log('CHANNEL', channel);
	return async (dispatch, getState) => {
		const nextPage = resetCounter ? 1 : getState().currentPage + 1;
		const basicPath = {
			everything: `/everything?sources=${channel.id}&page=${nextPage}&apiKey=6f1b98b92f7243a9a2f83cc89503b28a`,
			topHeadlines: `/top-headlines?sources=${channel.id}&page=${nextPage}&apiKey=6f1b98b92f7243a9a2f83cc89503b28a`,
		};
		const url = basicPath[section];
		await instance.get(url).then((response) => {
			if (response.status === 200) {
				dispatch({
					type: 'POPULATE_ARTICLES',
					resetCounter: resetCounter,
					currentPage: nextPage,
					channelId: channel.id,
					channelName: channel.name,
					newsArticles: response.data.articles,
				});
			}
		});
	};
};
