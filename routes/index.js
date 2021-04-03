var express = require('express');
var twit = require('twitter');
var router = express.Router();
var path = require('path');

const twitter = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const supportedMarkets = [
  {
    url: '/tweets/village',
    params: {
      screen_name: 'AlamoAlerts_003',
      count: '6'
    }
  }, {
    url: '/tweets/south-lamar',
    params: {
      screen_name: 'AlamoAlerts_004',
      count: '6'
    }
  }, {
    url: '/tweets/slaughter-lane',
    params: {
      screen_name: 'AlamoAlerts_006',
      count: '6'
    }
  }, {
    url: '/tweets/lakeline',
    params: {
      screen_name: 'AlamoAlerts_007',
      count: '6'
    }
  }, {
    url: '/tweets/mueller',
    params: {
      screen_name: 'AlamoAlerts_008',
      count: '6'
    }
  }
];

supportedMarkets.forEach(market => {
  router.get(market.url, function(req, res, next) {
    twitter.get('statuses/user_timeline', market.params, function(error, tweets, response){
      if (error) {
        res.status(response.statusCode).json({ error: error });
      } else {
        res.send(tweets);
      };
    });
  });
});

module.exports = router;
