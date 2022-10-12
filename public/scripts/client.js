/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(() => {
  const getDaysAgo = function (earlierDate) {
    console.log(Date.now());
    const dayNumMinutes = (Date.now() - earlierDate) / (1000 * 60);
    const dayNumHours = dayNumMinutes / 60;
    const dayNumDays = dayNumHours / 24;
    const dayNumYears = dayNumDays / 365;
    if (dayNumMinutes < 60) {
      return `${Math.floor(dayNumMinutes)} minute${dayNumMinutes > 1 ? 's' : ''} ago`
    }
    if (dayNumMinutes < 1400) {
      return `${Math.floor(dayNumHours)} hour${dayNumHours > 1 ? 's' : ''} ago`
    }
    if (dayNumMinutes < 525600) {
      return `${Math.floor(dayNumDays)} day${dayNumDays > 1 ? 's' : ''} ago`
    }
    return `${Math.floor(dayNumYears)} year${dayNumYears > 1 ? 's' : ''} ago`
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
      $('#tweets-container').append(createTweetElement(tweet));
    }
  }
  
  //TESTING FOR RENDERTWEETS FUNCTION-------------------
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  //----------------------------------------------------
  renderTweets(data);

  $('section.new-tweet form').on('submit', function (event) {
    event.preventDefault();
    const form = $(event.target);
    //tweetContent = form.find('textarea').val();
    console.log(form.serialize());
    $.ajax('/tweets', { data: form.serialize(), method: 'POST' })
      .catch((err) => console.log(err));
  });
})
