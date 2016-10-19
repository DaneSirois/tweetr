
const countCharacters = require('./composer-char-counter.js');
const toggleStateOnHover = require('./hover_states.js');
const tweets_module = require('./tweets_module.js');
const tweets_view_factory = require('./tweets_view_factory.js');

$(function() {

  const tweetsList = tweets_view_factory('.tweetList');

  // UI Handlers:
  $('.new-tweet textarea').on('input', countCharacters);  
  $('.tweetList .tweet').hover(toggleStateOnHover);

  // POST requests:
  $('.new-tweet form').on('submit', function(event) { 
    event.preventDefault(); 
    const formText = $(this).find('textarea').val();

    tweets_module.submitTweet(formText).then(() => {
      return tweets_module.getTweets();
    }).then((tweetsArray) => {
      tweetsList.render(tweetsArray);
    }).then(() => {
      location.reload();
    }).fail((error) => {
      console.error(`Error: ${error}`);
    });

  });

  // GET requests:
  tweets_module.getTweets().then((tweetsArray) => {
    tweetsList.render(tweetsArray);
  });
  
});
