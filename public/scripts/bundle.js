/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	const countCharacters = __webpack_require__(2);
	const toggleStateOnHover = __webpack_require__(3);
	const tweets_module = __webpack_require__(4);
	const tweets_view_factory = __webpack_require__(5);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	const countCharacters = function (event){
	  event.stopPropagation();
	  const maxChars = 140;
	  const input = $(this).val();
	  const counter =  $('.new-tweet .counter');

	  counter.empty().append(maxChars - input.length);

	  if (maxChars - input.length < 0) {
	    counter.addClass('counter--red');
	  } else {
	    counter.removeClass('counter--red');
	  }
	}

	module.exports = countCharacters;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const toggleStateOnHover = function (event) {
	  $('.tweet .tweet__social-buttons').toggleClass('show');
	};

	module.exports = toggleStateOnHover;

/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	const tweetsViewFactory = function (htmlSelector) {
	  const $selector = htmlSelector;

	  const _buildTweetElement = function (tweetData) {
	    const data = tweetData;
	    const $tweet = $('<article>').addClass('tweet');

	    const $img = $('<img>').addClass('tweet__profile-pic').attr('src', data.user.avatars.regular);;
	    const $username = $('<p>').addClass('tweet__username').text(data.user.name);
	    const $tweeterHandle = $('<p>').addClass('tweet__tweeter-handle').text(data.user.handle);
	    const $header = $('<header>').append($img);
	    $header.append($username);
	    $header.append($tweeterHandle);

	    const $body_text = $('<p>').addClass('tweet__text-body').text(data.content.text);
	    const $section = $('<section>').append($body_text);

	    const $date = $('<p>').addClass('tweet__date').text(data.created_at);
	    const $socialButtons = $('<div>').addClass('tweet__social-buttons');
	    const $socialIcon_flag = $('<i>').addClass('fa fa-flag');
	    const $socialIcon_repost = $('<i>').addClass('fa fa-retweet');
	    const $socialIcon_save = $('<i>').addClass('fa fa-heart');
	    const $footer = $('<footer>').append($date);
	    $socialButtons.append($socialIcon_flag);
	    $socialButtons.append($socialIcon_repost);
	    $socialButtons.append($socialIcon_save);
	    $footer.append($socialButtons);
	    
	    $tweet.append($header);
	    $tweet.append($section);
	    $tweet.append($footer);

	    const $tweetLi = $('<li>').append($tweet);

	    return $tweetLi;
	  };

	  return {
	    render: function(tweetsArr) {
	      tweetsArr.forEach((tweet) => {
	        const builtTweet = _buildTweetElement(tweet);
	        $($selector).append(builtTweet);
	      });
	    }
	  };

	};


	module.exports = tweetsViewFactory;



/***/ }
/******/ ]);