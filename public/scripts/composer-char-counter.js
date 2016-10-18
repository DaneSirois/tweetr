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
