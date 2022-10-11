$(document).ready(() => {
  $('article.tweets').on('mouseover', function () {
    $(this).addClass('tweet-highlight')
  });
  $('article.tweets').on('mouseleave', function () {
    $(this).removeClass('tweet-highlight')
  });

  $('div.tweets-interact i').on('mouseover', function () {
    $(this).addClass('icon-highlight')
  })
  $('div.tweets-interact i').on('mouseleave', function () {
    $(this).removeClass('icon-highlight')
  })
});