// let hover_states = {};

// hover_states.toggleState = function ($htmlSelector) {

//   $($htmlSelector).toggleClass('show');
// };

// hover_states.selected = function ($htmlSelector) {

//   $($htmlSelector).toggleClass('selected');
// };


// module.exports = hover_states;

// const $ = require('jQuery'); // normally needed for proper web-pack app

module.exports = {
  toggleState($htmlSelector)
  {
    $($htmlSelector).toggleClass('show');
  },
  selected($htmlSelector)
  {
    $($htmlSelector).toggleClass('selected');
  }
};