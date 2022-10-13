/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(() => {

  const getDaysAgo = function (earlierDate) {
    return timeago.format(earlierDate);
  }

  const createTweetElement = function (tweetObject) {
    const daysAgo = getDaysAgo(tweetObject.created_at)
    const $tweet = $('<article class="tweets">');
    const $tweetHeader = $('<header><div class="username"><img><p></div><p></header>');
    const $tweetContent = $('<section><p></section>');
    const $tweetFooter = $('<footer><p class="posted-date"><div class="tweets-interact"><i class="fa-solid fa-flag"/><i class="fa-sharp fa-solid fa-retweet"/><i class="fa-solid fa-heart"/></div></footer>');
    
    $tweetHeader.find('img').attr('src', tweetObject.user.avatars);
    $tweetHeader.find('div p').text(tweetObject.user.name)
    $tweetHeader.children('p').text(tweetObject.user.handle)
    $tweetContent.find('p').text(tweetObject.content.text)
    $tweetFooter.children('p').text(daysAgo)
  
    $tweet.append($tweetHeader);
    $tweet.append($tweetContent);
    $tweet.append($tweetFooter);
    return $tweet;
  }

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  $('section.new-tweet form').on('submit', function (event) {
    event.preventDefault();
    const form = $(event.target);
    tweetContent = form.find('textarea').val();
    form.find("label[for='tweet-text']").text('');
    if (tweetContent.length > 140) {
      form.find("label[for='tweet-text']").text('Tweet can only be up to 140 characters');
      return;
    } 
    if (!tweetContent || (tweetContent.length < 1)) {
      form.find("label[for='tweet-text']").text('Tweet is empty');
      return;
    } 
    console.log(tweetContent)
    $.ajax('/tweets', { data: form.serialize(), method: 'POST' })
      .then(() => {
        form.find('textarea').val('');
        $('#tweets-container').empty();
        loadTweets();
      })
      .catch((err) => console.log(err));
  });

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets)
      })
      .catch((err) => console.log(err));
  }

  loadTweets();
})
