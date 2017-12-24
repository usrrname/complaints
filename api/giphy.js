'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var giphy = require('giphy-api');
var server = require('./server');
var Config = require('./config');

var PUBLIC_KEY = Config.PUBLIC_KEY;
var BASE_URL = '//api.giphy.com/v1/gifs/';
var ENDPOINT = 'search';
var LIMIT = 1;
var RATING = 'g';
var queryInput = query;
var resultWrapper = results;
var results = [];
var PUBLIC_KEY = process.env.PUBLIC_KEY || Config.PUBLIC_KEY;

var currentTimeout = 2000;
var query = {
    text: 'success',
    offset: 0,
    request: function request() {
        return '' + BASE_URL + ENDPOINT + '?q=' + this.text + '&limit=' + LIMIT + '&rating=' + RATING + '&offset=' + this.offset + '&api_key=' + PUBLIC_KEY;
    },
    fetch: function fetch(callback) {
        $http.get(this.request()).success(function (data) {
            res.send(data);
            console.log(data);
            if(results.length) {
                var url = results[0].images.downsized.url;
                console.log(url);
                callback(url);
            } else {
                callback('');
            }
        }).fail(function (error) {
            console.log(error);
        });
    }
};

module.exports = router;