angular.module('twitterApp')
       .service('filterSrv', filterSrv);

function filterSrv($http){
  var ctrl = this;
  
  ctrl.getTweets = getTweets;
  ctrl.refine = refine;

  ctrl.tweets = [];
  ctrl.refTweets = [];
  // ctrl.parsedImgs = [];
  // ctrl.parsedImgsLinks = [];

  function getTweets(){
     $http.get('/tweets')
    .then(function(res){
      if (res.status === 200){
      ctrl.tweets = res.data;
      ctrl.refine();
      } 
        else{
          res.json(err);
        }
      })
  }

  function refine(){
    for (var i = 0; i< ctrl.tweets.length; i++){
      //remove hashtags
      // console.log(ctrl.tweets[i]);
      var removeHash = new RegExp('#([^\\s]*)','g');
      var noHashtags = ctrl.tweets[i].replace(removeHash, '');
      //remove twitter handles
      var removeHandle = new RegExp('@([^\\s]*)','g');
      var noHandles = noHashtags.replace(removeHandle, '');
      //remove emojis
      var noEmojis = noHandles.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
      var basicFilter = noEmojis.removeSomeWords();
      // remove urls
      var httpLoc = basicFilter.indexOf('https://' || 'http://');
      // console.log(httpLoc);
      var refTweet = basicFilter;

      if (httpLoc != -1) {
        refTweet = basicFilter.substr(0, httpLoc);
      }
      //starts in middle of tweet
      else if (httpLoc == ' ' ) {
        refTweet = refTweet.substr(0, httpLoc) + refTweet.substr(spcIdx, refTweet.length);
        }
      
        // if http in middle of tweet ....
      //   for (var i = httpLoc ; i < basicFilter.length ; i++) {
      
      //     if (basicFilter[i] == ' ' ) {
      //     var spcIdx = i;
      //     basicFilter = basicFilter.substr(0, httpLoc) + basicFilter.substr(spcIdx, basicFilter.length);
      //    }
      //  }
      // } 
      // console.log(refTweet);
      ctrl.refTweets.push(refTweet);
      // getKeyWords();
      }
    } 

    //   function getKeyWords(){
    //     for (var i = 0; i<ctrl.refTweets.length; i++){
    //     var refinedString = ctrl.refTweets[i].removeStopWords();
    //     console.log('refined strings' + refinedString);
    //     var arrayOfRefinedString = refinedString.split(' ');
    //     console.log(arrayOfRefinedString);
    //   }
    // }
        // 
        // console.log(arrayOfRefinedString);
        // for (var i = httpLoc ; i < tweet.length ; i++) {
        //   if (tweet[i] !== ' ' ) {
        //   var spcIdx = i;
        //   tweet = tweet.substr(0, httpLoc) + tweet.substr(spcIdx, tweet.length);
        //    }
        //     else{
        //       console.log(tweet);
        //     }
        // } 
        // var randomString = arrayOfRefinedString[Math.floor(Math.random() * arrayOfRefinedString.length)]
        // console.log(randomString);
        
      // }
  ctrl.parsedImgs = [];
  ctrl.parsedImgsLinks = [];
  ctrl.getImages = getImages;
  function getImages(){
    return $http.get('/images')
    .then(function (res, err){
      if (res.status == 200){
        try{
          // console.log(res.data);
        var stringObj = JSON.parse(JSON.stringify(res.data));

          for (var i = 0; i < stringObj.length; i++){
            ctrl.parsedImgs.push(JSON.parse(stringObj[i]));
          }
          // console.log(ctrl.parsedImgs);
          for (var i = 0; i < ctrl.parsedImgs.length; i++){
            ctrl.parsedImgsLinks.push(ctrl.parsedImgs[i].display_sizes[0].uri);
            }
          //console.log(ctrl.parsedImgsLinks);
          return ctrl.parsedImgsLinks;
          } catch(e){
            console.log(e);
          } 
        }
      else{
        console.log(err);
      }
    })
  }
ctrl.gifArray = [];
ctrl.getGif = getGif();
ctrl.str = "";
function getGif(){
var gifObjs = $http.get("http://api.giphy.com/v1/gifs/search?q=success&api_key=dc6zaTOxFJmzC&limit=10")
.then(function(res) { 
  console.log(res);
  for (var i = 0; i<res.data.data.length; i++){
  ctrl.imgLink = ctrl.str+res.data.data[i].url;
  ctrl.gifArray.push(ctrl.imgLink);
    }console.log(ctrl.gifArray);
  });
}
  //   $http.get('/gifs')
  //   .then(function (res, err){
  //    if (res.status == 200){
  //     //console.log(res.data);
  //     res.send(res.data);
  //    }
  //    else{
  //     console.log(err);
  //    }
  //   })
  
}//closing whole service
