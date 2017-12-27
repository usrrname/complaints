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
    apiSecret: process.env.apiSecret || Config.getty.apiSecret,
    searchPhrase: process.env.searchPhrase || Config.getty.searchPhrase
};

var search = creds.searchPhrase;

var client = new api(creds);
client.search().images().withPage(1).withPageSize(10).withPhrase(search)
    .execute(function(err, res) {
        if (err) {
        	throw err;
        }
        if (res.status == 200){
            for (var i = 0; i <= res.images.length; i++){
            imageArray.push(res.images[i]);
        }
    }
});

client.getAccessToken(function (err, response) {
    if (err) throw err
    console.log(JSON.stringify(response.access_token));
});

router.get('/', function(req,res){
if (res.status = 200){
    res.json(imageArray);
    }else{
    console.log(err);
    }
});

module.exports = router;