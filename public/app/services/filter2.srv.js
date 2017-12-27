angular.module('twitterApp')
       .service('filterSrv', filterSrv);

function filterSrv($http){
  var ctrl = this;
  
  ctrl.getTweets = getTweets;
  ctrl.refine = refine;
  ctrl.getImages = getImages;
  ctrl.imagesArray=[];
  ctrl.tweets = [];
  ctrl.refinedTweets = [];
  ctrl.refTweets = [];

  ctrl.parsedImgs = [];
  ctrl.parsedImgsLinks = [];
  ctrl.removeThings = removeThings;

  function getTweets(){
     $http.get('/tweets')
    .then(function(res){
      if (res.status === 200){
        ctrl.refTweets = res.data;
      } 
        else{
          res.json(err);
        }
      })
  }

  function refine(){
    $http.get('/refined').then(function(res){
      if(res.status === 200) {
        try {
        ctrl.tweets = res.data;
        for (var j = ctrl.tweets[i]; i <= ctrl.tweets.length; i++) {
          var i = 0;
          console.log(j);
          //remove hashtags
          var str = String(j);
          str.trim();
          var removeHash = new RegExp('#([^\\s]*)', 'g');
          var noHashtags = str.replace(removeHash, '');
          //remove twitter handles
          var removeHandle = new RegExp('@([^\\s]*)', 'g');
          var noHandles = noHashtags.replace(removeHandle, '');

          //remove emojis
          var noEmojis = noHandles.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
          str = noEmojis;
          var httpLoc = str.indexOf('http://' || 'https://' || 'https://t.co/');

          var linkIndex = httpLoc.value;
          var beforeHttp = str.substring(0, httpLoc);
          //if hasLink
          if (httpLoc != -1) {
            var remaining = beforeHttp.substring(endOfLink, str.length);
            var str = beforeHttp.concat(remaining);
          }
          //if link starts in middle of tweet
          if (httpLoc == ' ') {
            var remaining = str.substring(httpLoc, str.length);
            var endOfLink = remaining.substring(remaining.indexOf(' ') + 1) || str.length - 1;
            var link = str.substring(http.Loc, endOfLink);
            str.replace(link, '');
            ctrl.refinedTweets.push(str);
          } 
        } 
        return refinedTweets;
        refinedTweets =refTweets;
      } 
      finally{
        res.json(err);
        }
      }
  })
}

 // function removeThings(){
    // for (var j = ctrl.tweets[i]; i <= ctrl.tweets.length; i++){
    //   var i =0; 
    //   console.log(j);
    //   //remove hashtags
    //   var str = String(j);
    //   str.trim();
    //   var removeHash = new RegExp('#([^\\s]*)','g');
    //   var noHashtags = str.replace(removeHash, '');
    //   //remove twitter handles
    //   var removeHandle = new RegExp('@([^\\s]*)','g');
    //   var noHandles = noHashtags.replace(removeHandle, '');

    //   //remove emojis
    //   var noEmojis = noHandles.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
    //   str = noEmojis;
    //   var httpLoc = str.indexOf('http://'|| 'https://' || 'https://t.co/');

    //   var linkIndex = httpLoc.value;
    //   var beforeHttp = str.substring(0, httpLoc);
    //   //if hasLink
    //   if (httpLoc != -1) {
    //     var remaining = beforeHttp.substring(endOfLink, str.length);
    //     var str = beforeHttp.concat(remaining);
    //   }
    //   //if link starts in middle of tweet
    //   if (httpLoc == ' ' ) {
    //     var remaining = str.substring(httpLoc, str.length);
    //     var endOfLink = remaining.substring(remaining.indexOf(' ')+1) || str.length-1;
    //     var link = str.substring(http.Loc, endOfLink);
    //     str.replace(link, '');       
    //   } ctrl.refinedTweets.push(str);   
    // }
  //}


  //     function getKeyWords(){
  //       for (var i = 0; i < ctrl.refTweets.length; i++){
  //       var refinedString = ctrl.refTweets[i].removeStopWords();
  //       console.log('refined strings' + refinedString);
  //       var arrayOfRefinedString = refinedString.split(' ');
  //       console.log(arrayOfRefinedString);
  //     }
    //   }
        
  //       for (var i = httpLoc ; i < tweet.length ; i++) {
  //         if (tweet[i] !== ' ' ) {
  //         var spaceIndex = i;
  //         tweet = tweet.substr(0, httpLoc) + tweet.substr(spaceIndex, tweet.length);
  //          }
  //           else{
  //             console.log(tweet);
  //           }
  //       } 
  //       var randomString = arrayOfRefinedString[Math.floor(Math.random() * arrayOfRefinedString.length)]
  //       console.log(randomString);
        
  function getImages(){
    return $http.get('/images')
    .then(function (res, err){
      if (res.status == 200){
        try{
          var imagesArray = res.data;
        var stringObj = imagesArray;
          for (var i = 0; i < stringObj.length; i++){
            ctrl.parsedImgs.push(stringObj[i]);
          }
          // console.log(ctrl.parsedImgs);
          for (var i = 0; i < ctrl.parsedImgs.length; i++){
            ctrl.parsedImgsLinks.push(ctrl.parsedImgs[i].display_sizes[0].uri);
            }
          console.log(ctrl.parsedImgsLinks);
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

// ctrl.gifArray = [];
// ctrl.getGif = getGif();
// ctrl.str = "";
// function getGif(){
// var gifObjs = $http.get("http://api.giphy.com/v1/gifs/search?q=success&api_key=dc6zaTOxFJmzC&limit=10")
// .then(function(res) { 
//   console.log(res);
//   for (var i = 0; i<res.data.data.length; i++){
//   ctrl.imgLink = ctrl.str+res.data.data[i].url;
//   ctrl.gifArray.push(ctrl.imgLink);
//     }console.log(ctrl.gifArray);
//   });
// }
//     $http.get('/gifs')
//     .then(function (res, err){
//      if (res.status == 200){
//       //console.log(res.data);
//       res.send(res.data);
//      }
//      else{
//       console.log(err);
//      }
//     })

//closing whole service
}