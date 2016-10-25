
const utilities_module = require('./utilities_module.js');
const tweets_module = require('./tweets_module.js');
const tweets_view_factory = require('./tweets_view_factory.js');

$(function() {

  const tweetsList = tweets_view_factory('.tweetList');

  // UI Events:
  $('.new-tweet textarea').on('input', utilities_module.countCharacters);  
  $('#nav-bar .compose__button').on('click', () => {
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').focus();
  });

  // On New Tweet:
  $('.new-tweet form').on('submit', function(event) { 
    event.preventDefault(); 
    let inputText = $(this).find('textarea').val();
    let inputLength = Number(inputText.length);
  
    if (inputLength <= 140 && /\S/.test(inputText) && inputText != null || "") {
      
      tweets_module.submitTweet(inputText).then(() => {
        return tweets_module.getTweets();
      }).then((tweetsArray) => {
        tweetsList.render(tweetsArray);
      }).then(() => {
        tweets_module.getTweets().then((tweetsArray) => {
          tweetsList.render(tweetsArray);
        });
      }).fail((error) => {
        console.error(`Error: ${error}`);
      });

    } else {
      alert("Error with input!");
    }
  });

  // On Initial Load:
  tweets_module.getTweets().then((tweetsArray) => {
    tweetsList.render(tweetsArray);
  });
  
});
