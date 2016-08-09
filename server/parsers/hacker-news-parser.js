const rp = require('request-promise');

const TOP_STORIES_FEED_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const BEST_STORIES_FEED_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

function retrieveStory(storyId) {

  const options = {
    uri: 'https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true,
  };

  return rp(options)
    .then((data) => {
      const story = {
        'id': data['id'],
        'title': data['title'],
        'by': data['by'],
        'score': data['score'],
        'url': data['url'],
      };
      return story;
    })
    .catch(function (err) {
        // API call failed...
    });
}

function retrieveStories(feedUrl) {

  const options = {
    uri: feedUrl,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true,
  };

  return rp(options)
    .then((data) => {

      let retrieveStoryPromises = [];

      for (var i = 0; i < 10; i++) {
        let storyId = data[i];
        let retireveStoryPromise = new Promise((resolve, reject) => {
          resolve(retrieveStory(storyId));
        });

        retrieveStoryPromises.push(retireveStoryPromise);
      }

      return Promise.all(retrieveStoryPromises).then(stories => stories);
    })
    .catch(function (err) { 
        // API call failed...
    });

}

export default function parseHackerNews() {
  return retrieveStories(TOP_STORIES_FEED_URL).then((stories) => stories);
}