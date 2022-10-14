/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(() => {

  //create tweet reveal button
  $('nav button').on('click', () => {
    $('section.new-tweet').slideDown('slow');
    $('#tweet-text').focus();
  });

  //scroll-top button
  $('#scroll-top').on('click', () => {
    window.scrollTo(0, 0);
    $('section.new-tweet').slideDown('slow');
    $('#tweet-text').focus();
  })

  $(window).on('scroll', () => {
    if ($(this).scrollTop() < 130) {
      $('#scroll-top').css('display', 'none')
    } else {
      $('#scroll-top').slideDown('slow');
      }
  });

  //get days since posted
  const getDaysAgo = function (earlierDate) {
    return timeago.format(earlierDate);
  }

  //create a tweet from object of data
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

  //add tweet elements to html page
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  //submit written tweet
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
    $.ajax('/tweets', { data: form.serialize(), method: 'POST' })
      .then(() => {
        form.find('textarea').val('');
        $('#tweets-container').empty();
        loadTweets();
      })
      .catch((err) => console.log(err));
  });

  //get tweets from backend
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets)
      })
      .catch((err) => console.log(err));
  }

  loadTweets();

})
