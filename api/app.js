var express = require('express');
var OAuth2 = require('oauth').OAuth2; 
var api = express();
var router = express.Router();
var bodyParser = require('body-parser');
var util = require('util');
var Twitter = require('twitter');
var filterWords = ('./stopwords.js');
var Config = require('./config.js');
var moment = require('moment');
var tweetObj; // returns date and tweet in same obj
var popObj;
var recentTweets = [];
var popularTweetsOnly =[];

router.get('/', function(req, res) {
        res.send(tweetObj)
      });

router.get('/pop', function (req, res) {
    res.send(popObj);
});

    var client = new Twitter(Config.twitter);
    client.get('https://api.twitter.com/1.1/search/tweets.json',
        {
            'q': '%22i%20can\'t%20believe%22 OR :( OR hate OR ugh OR awful OR sucks -filter:retweets -filter:mentions',
            'lang': 'en',
            'result_type': 'recent',
            'count': 15,
            'delimited': 'length',
            'truncated': 'true'
        },
        function (err, data, body) {
            var utc = [];
            var recentTime = [];
            var recentTweets = []; //store the most recent tweets
            if (err) {
                console.log('ERROR [%s]', err);
            }
            for (var i = 0; i < data.statuses.length; i++) {
                var index = data.statuses[i].created_at;
                
                utc.push(moment.utc(index).format('HH:mm:z'));
                var timeFromNow = moment(index).fromNow();
                
                recentTime.push(timeFromNow);
                var textOnly = String(data.statuses[i].text);
                
                recentTweets.push(textOnly);
            };
            tweetObj = recentTime.map(function (item, i) {
                return { 'tweet': recentTweets[i], 'time':utc[i], 'timeElapsed': recentTime[i],  };
            });
            return tweetObj;
        });

    var pop = new Twitter(Config.twitter);
    pop.get('https://api.twitter.com/1.1/search/tweets.json',
        {
            'q': '%22i%20can\'t%20believe%22 OR :( OR hate OR ugh OR awful OR sucks -filter:mentions',
            'lang': 'en',
            'result_type': 'popular',
            'count': 30,
            'delimited': 'length',
            'truncated': 'true'
        },
        function (err, data, body) { 
            var utc = [];
            var inLastWeek = [];
            var popularTweetsOnly = [];
            if (err) {
                console.log('ERROR [%s]', err);
            }
            for (var i = 0; i < data.statuses.length; i++) {
                popularTweetsOnly.push(String(data.statuses[i].text));
                var index = data.statuses[i].created_at;
                utc.push(moment.utc(index).format('HH:mm:z'));
                var timeFromNow = moment(index).fromNow();
                inLastWeek.push(timeFromNow);
            };
            popObj = inLastWeek.map(function (item, i) {
                return { 'tweet': popularTweetsOnly[i], 'time': utc[i], 'timeElapsed': inLastWeek[i]};
            });
            return popObj;
        });

function callback(e){
    return e;
}
var access_token = Config.twitter.access_token;
var twitterconsumerKey = Config.twitter.consumer_key;
var twitterConsumerSecret = Config.twitter.consumer_secret;
//TWITTER AUTHENICATION
var token = null;
var oauth2 = new OAuth2(
    twitterconsumerKey,
    twitterConsumerSecret,
    'https://api.twitter.com/',
    null,
    'oauth2/token',
    null);
oauth2.getOAuthAccessToken(
    '',
    { 'grant_type': 'client_credentials' },
    function (e, access_token, refresh_token, results) {
        //console.log('bearer: ', access_token);
        oauth2.get('protected url',
            access_token, function (e, data, res) {
                if (e) return callback(e, null);
                if (res.statusCode != 200)
                    return callback(new Error(
                        'OAuth2 request failed: ' +
                        res.statusCode), null);
                try {
                    data = JSON.parse(data);
                }
                catch (e) {
                    return callback(e, null);
                }
                return callback(e, data);
            });
    });

module.exports = router;