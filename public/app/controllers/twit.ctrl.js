angular.module('twitterApp')
  .controller('TwitterCtrl', TwitterCtrl);

function TwitterCtrl(filterSrv, $http, $state, images, $window) {
  var ctrl = this;

  ctrl.reloadRoute = reloadRoute;

  ctrl.filterSrv = filterSrv;
  ctrl.refTweets = filterSrv.refTweets;
  ctrl.getTweets = filterSrv.getTweets;
  ctrl.getGif = filterSrv.getGif;
  ctrl.refine = filterSrv.refine;

  ctrl.date = filterSrv.date;

  console.log(ctrl.date);

  function reloadRoute() {
    $window.location.reload();
  }

  function getTweets() {
    ctrl.getTweets = filterSrv.getTweets();
    ctrl.refine = filterSrv.refine();
    ctrl.date = filterSrv.date;
    return [ctrl.refTweets, ctrl.date];
  }

  getTweets();

  ctrl.getImages = filterSrv.getImages;
  ctrl.imagesArray = filterSrv.imagesArray;
  console.log(ctrl.imagesArray);

  function getImages() {
    ctrl.getImages = filterSrv.getImages();
    return ctrl.imagesArray;
}
getImages();
}
