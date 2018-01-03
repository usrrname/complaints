var express = require('express');
var app = express();
var router = express.Router();
var getty = require('./getty-images');
var twap = require('./app');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var giphy = require('./giphy');
var Config = require('./config');
var server = app.listen(port, function(){
  console.log('connected on: ' + port);
});

app.use(express.static(__dirname + './../public/app'));

app.use('/tweets', twap);
app.use('/images', getty);
app.use('/gifs', giphy);
app.use('/pop', twap);

// APP CONFIG
app.use(bodyParser.json(twap.tweetsOnly));
app.use(bodyParser.urlencoded({  
  extended: true
}));

app.get('/tweets', function(req, res) {
          res.send(twap.tweetObj);
      });

app.get('/pop', function (req, res) {
  res.send(twap.popObj);
});

app.get('/gifs', function(req, res){
	res.send(giphy.query);
});

module.exports = router;