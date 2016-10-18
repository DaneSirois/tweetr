
const countCharacters = require('./composer-char-counter');

$(document).ready(() => {
  
  $('.new-tweet textarea').on('input', countCharacters);  

});

