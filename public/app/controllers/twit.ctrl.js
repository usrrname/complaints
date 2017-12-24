angular.module('twitterApp')
       .controller('TwitterCtrl', TwitterCtrl);

function TwitterCtrl(filterSrv, $http, $state, images, $window){
  var ctrl = this;

  ctrl.reloadRoute = reloadRoute;

  ctrl.filterSrv = filterSrv;
  ctrl.refTweets = filterSrv.refTweets;
  ctrl.getTweets = filterSrv.getTweets;
  ctrl.getGif = filterSrv.getGif;
  // ctrl.imagesArray = [];
  // ctrl.imagesArray = filterSrv.imagesArray;
  function reloadRoute() {
     $window.location.reload();
  }

  function getTweets(){
    ctrl.refTweets = filterSrv.getTweets();
    return ctrl.refTweets = filterSrv.refTweets;
  }
  getTweets();

  ctrl.getImages = getImages;
  ctrl.images = images;
  ctrl.parsedImgs = [];
  ctrl.parsedImgsLinks = [];
  //console.log(ctrl.images);
  
  function getImages(){
    $http.get('/images')
    .then(function (res, err){
      if (res.status == 200){
        try{
        var stringObj = res.data;
          for (var i = 0; i < stringObj.length; i++){
            ctrl.parsedImgs.push(stringObj[i]);
          }
          //console.log(ctrl.parsedImgs);
          for (var i = 0; i < ctrl.parsedImgs.length; i++){
            ctrl.parsedImgsLinks.push(ctrl.parsedImgs[i].display_sizes[0].uri);
            }
          ctrl.imgUrls = ctrl.parsedImgsLinks;
          //console.log(ctrl.imgUrls);
          
          return ctrl.imgUrls; 
          } catch(e){
            console.log(e);
           } 
        ;} 
      else{
        console.log(err);
      }
    })
  } 
}
    