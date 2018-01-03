var app = angular.module('twitterApp', ['ngRoute', 'ui.router']);

app.config(function($stateProvider, $httpProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('tweets', {
		url:'/',
		templateUrl:'/partials/home.html',
		controller: 'TwitterCtrl as ctrl',
		resolve:{
			images: function(filterSrv){
				return filterSrv.getImages()
					.then(function(res){ //won't load til .then is done 
						return res;
					})
			}
		}
		})
		.state('pop', {
			url: '/',
			templateUrl: '/partials/home.html',
			controller: 'TwitterCtrl as ctrl',
			resolve: {
				popTweets: function(filterSrv){
					return filterSrv.popularTweets().then(function (res){
						return res;
					})
				},
				images: function (filterSrv) {
					return filterSrv.getImages()
						.then(function (res) { //won't load til .then is done 
							return res;
						})
				}
			}
		})
	.state('time', {
		url:'/',
		templateUrl:'/partials/time.html',
		controller: 'timeCtrl as ctrl'
	})
	.state('gifs', {
		url:'/',
		templateUrl: 'partials/home.html',
		controller:'TwitterCtrl as ctrl',
		resolve:{
			gifs: function(filterSrv){
				return filterSrv.getGif()
				.then(function(res){
					console.log(res.data);
					return res.data;
				})
			}
		}
	})
});