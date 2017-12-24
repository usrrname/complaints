var express = require('express');
var https = require('https');
var api = require("gettyimages-api");
var router = express.Router();
var bodyParser = require('body-parser');
var server = require('./server');
var Config = require('./config');

//global vars
var imageArray = [];
var app = express();

//getty config
var creds = {
    username: process.env.username || Config.getty.username,
    password: process.env.password || Config.getty.password,
    apiKey: process.env.apiKey || Config.getty.apiKey,
    apiSecret: process.env.apiSecret || Config.getty.apiSecret
};

var client = new api(creds);
client.search().images().withPage(1).withPageSize(15).withPhrase('disbelief OR disaster')
    .execute(function(err, res) {
        if (err) {
        	throw err;
        }else{
            for (var i = 0; i < res.images.length; i++){
            imageArray.push(JSON.stringify(res.images[i]));
        }
    }
});

router.get('/', function(req,res){
if (res.status = 200){
    res.send(imageArray);
    }else{
    console.log(err);
    }
});

module.exports = router;