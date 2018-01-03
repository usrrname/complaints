angular.module('twitterApp')
  .controller('TwitterCtrl', TwitterCtrl);

function TwitterCtrl(filterSrv, $http, $state, images, $window) {
  var ctrl = this;

  ctrl.reloadRoute = reloadRoute;
  ctrl.filterSrv = filterSrv; 
  
  ctrl.tweetObj = filterSrv.tweetObj;
  ctrl.tweets = filterSrv.tweets;
  ctrl.refinedTweets = filterSrv.refinedTweets;
  

  ctrl.getTweets = filterSrv.getTweets;
  ctrl.recentDate = filterSrv.recentDate;
  
  ctrl.popTweets=filterSrv.popTweets;
  ctrl.popDate = filterSrv.popDate;
  ctrl.popObj = filterSrv.popObj;
 ctrl.popularRefinedTweets = filterSrv.popularRefinedTweets;

  //functions
  ctrl.getGif = filterSrv.getGif;
  ctrl.refine = filterSrv.refine;
  ctrl.popularTweets = filterSrv.popularTweets;

  function reloadRoute() {
    $window.location.reload();
  }

  function getTweets() {
    ctrl.getTweets = filterSrv.getTweets();
    ctrl.refinedTweets = filterSrv.refinedTweets;
    return [ctrl.refinedTweets, ctrl.recentDate];
  }

  function popularTweets() {
    ctrl.popularTweets = filterSrv.popularTweets();
    ctrl.popularRefinedTweets = filterSrv.popularRefinedTweets;
    ctrl.popObj = filterSrv.popObj;
    ctrl.popTweets = filterSrv.popTweets;
    ctrl.popDate = filterSrv.popDate;
   return [ctrl.popTweets, ctrl.popDate];
  }

  ctrl.getImages = filterSrv.getImages;
  ctrl.imagesArray = filterSrv.imagesArray;

  function getImages() {
    ctrl.getImages = filterSrv.getImages();
    return ctrl.imagesArray;
}
getImages();
}
