$(function() {
  $.get('https://twitter.com/', function(data){
    let htmlData = data;


    if ($(data).filter('title').text() === "Twitter. It's what's happening.") {
      $('.spinner').remove()
      $('.main').removeClass('hidden')
      $('.main').prepend('<p>Sign in to <a href="https://twitter.com">Twitter</a></p>');
      $('.buttons').addClass('hidden')
      $('.new-tweet').addClass('hidden')
    } else {

    let feed = $(htmlData).find('ol').eq(0);
    let first_tweet = $(feed).find('li').eq(0)
    let id = first_tweet.attr('data-item-id');
    let username = first_tweet.find('span.username b').eq(0).text();
    let tweet_url = 'http://twitter.com/' + username + '/status/' + id
    let retweet_username = first_tweet.find('span.js-retweet-text a').attr('href');
    let reply_to_username = first_tweet.find('span[data-aria-label-part]').attr('href')
    let hashtags = first_tweet.find('a.twitter-hashtag').toArray()
    let at_users = first_tweet.find('a.twitter-atreply').toArray()
    let img = first_tweet.find('.AdaptiveMedia')
    let retweet_link = first_tweet.find('.QuoteTweet-link.js-nav').attr('href')
    let retweet = first_tweet.find('.QuoteTweet-authorAndText')



    first_tweet.find('span.js-retweet-text a').attr('href', 'http://www.twitter.com' + retweet_username)
    first_tweet.find('a.uncollapse.with-icn').attr('href', tweet_url)
    first_tweet.find('.missing-tweets-link').attr('href', tweet_url)
   	first_tweet.find('a.account-group').attr("href", `http://www.twitter.com/${username}`);
    first_tweet.find('a.tweet-timestamp').attr('href', tweet_url);

    $(img).click(function() {
        window.location.href = tweet_url;
    });

    $(retweet).click(function() {
      window.location.href =  'http://twitter.com/' + retweet_link;
    });

    for (var i = 0; i < hashtags.length; i++) {
      let hashtag = hashtags[i]
      let text = $(hashtag).text().slice(1)
      $(hashtag).attr('href', 'https://twitter.com/hashtag/' + text + '?src=hash')
    }
    for (var i = 0; i < at_users.length; i++) {
      let user = at_users[i]
      let text = $(user).text()
      $(user).attr('href', 'https://twitter.com/' + text)
    }

    first_tweet.find('span[data-aria-label-part]').attr('href', 'http://www.twitter.com' + reply_to_username)
    $('.main').removeClass('hidden')
    $('.spinner').remove()
    $('.main').prepend(first_tweet);
    $('.retweet').attr('href', 'http://twitter.com/intent/retweet?tweet_id=' + id);
    $('.like').attr('href', 'http://twitter.com/intent/like?tweet_id=' + id);
    $('.reply').attr('href', 'http://twitter.com/intent/tweet?in_reply_to=' + id);
    $('.dropdown').addClass('hidden');
    }
  });
})
