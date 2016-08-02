'use strict'

require('jsdom').env('', function(err, window) {
  if (err) {
    console.error(err);
    return;
  }

  const $ = require('jquery')(window);

  const RSS_FEED_URL = 'https://news.ycombinator.com/rss';

  const TOP_STORIES_FEED_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

  const BEST_STORIES_FEED_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

  function retrieveStories(feedUrl) {
    $.get(TOP_STORIES_FEED_URL, function (data, textStatus, jqXHR) {

      if (jqXHR.status !== 200) {
        console.log('There was an error in retrieving the feed:', feedUrl);
      }

      console.log('------------------------');

      for (var i = 0; i < 10; i++) {
        let storyId = data[i];
        retrieveStory(storyId);
      }

    });
  }

  const storyId = '12193062';

  function retrieveStory(storyId) {
    $.get('https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json', function (data, textStatus, jqXHR) {
      if (jqXHR.status !== 200) {
        console.log('There was an error in retrieving story id:', storyId);
      }

      // console.log('------------------------');
      console.log('id        :', data['id']);
      console.log('title     :', data['title']);
      console.log('by        :', data['by']);
      console.log('score     :', data['score']);
      console.log('url       :', data['url']);
      console.log('------------------------');
    })
  }

  retrieveStories(TOP_STORIES_FEED_URL);

  // retrieveStory(storyId);

});


