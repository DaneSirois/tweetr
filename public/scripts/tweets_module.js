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

// buildTweetElement = function (tweetData) {
//   const data = tweetData;
//   const $tweet = $('<article>').addClass('tweet');

//   const $img = $('<img>').addClass('tweet__profile-pic').attr('src', data.user.avatars.regular);;
//   const $username = $('<p>').addClass('tweet__username').text(data.user.name);
//   const $tweeterHandle = $('<p>').addClass('tweet__tweeter-handle').text(data.user.handle);
//   const $header = $('<header>').append($img);
//   $header.append($username);
//   $header.append($tweeterHandle);

//   const $body_text = $('<p>').addClass('tweet__text-body').text(data.content.text);
//   const $section = $('<section>').append($body_text);

//   const $date = $('<p>').addClass('tweet__date').text(data.created_at);
//   const $socialButtons = $('<div>').addClass('tweet__social-buttons');
//   const $socialIcon_flag = $('<i>').addClass('fa fa-flag');
//   const $socialIcon_repost = $('<i>').addClass('fa fa-retweet');
//   const $socialIcon_save = $('<i>').addClass('fa fa-heart');
//   const $footer = $('<footer>').append($date);
//   $socialButtons.append($socialIcon_flag);
//   $socialButtons.append($socialIcon_repost);
//   $socialButtons.append($socialIcon_save);
//   $footer.append($socialButtons);
  
//   $tweet.append($header);
//   $tweet.append($section);
//   $tweet.append($footer);

//   const $tweetLi = $('<li>').append($tweet);

//   return $tweetLi;
// };

// tweets_module.renderTweets = function (tweetsArr) {
//   tweetsArr.forEach((tweet) => {
//     const builtTweet = buildTweetElement(tweet);
//     $('.tweetList').append(builtTweet);
//   });
// };

module.exports = tweets_module;
