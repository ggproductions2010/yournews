const rp = require('request-promise');

const RSS_FEED = 'https://www.designernews.co/?format=rss';

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
      console.log(data);
      return data
    })
    .catch(function (err) { 
        // API call failed...
    });
}

export default function parseDesignerNews() {
  return retrieveStories(RSS_FEED).then((stories) => stories);
}