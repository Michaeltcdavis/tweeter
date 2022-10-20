$(document).ready(() => {

  $('#tweet-text').on('input', function () {
    const remainingChars = 140 - this.value.length;
    if (remainingChars < 0) {
      $(this).siblings('div.below-input').children('output').css('color', 'red');
    } else {
      $(this).siblings('div.below-input').children('output').css('color', '#545149');
    }
    $(this).siblings('div.below-input').children('output').text(remainingChars);
    // expand text area
    this.style.height = "";
    this.style.height = this.scrollHeight*1.05 + "px";
  });
});