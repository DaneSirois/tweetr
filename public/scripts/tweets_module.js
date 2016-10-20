let tweets_module = {};

tweets_module.submitTweet = (text) => $.ajax({
  method: 'post',
  url: '/tweets',
  data: {text}
});

tweets_module.getTweets = () => $.ajax({
  method: 'get',
  url: '/tweets',
  dataType: 'json'
});

module.exports = tweets_module;
