angular.module('twitterApp')
    .service('filterSrv', filterSrv);

function filterSrv($http) {
    var ctrl = this;
    ctrl.tweets = [];
    ctrl.recentDate = [];
    ctrl.refinedTweets=[];

    ctrl.tweetObj = {};
    ctrl.popObj={};
    ctrl.popTweets=[];
    ctrl.popDate=[];
    ctrl.finalTweets = [];

    //functions
    ctrl.getTweets = getTweets;
    ctrl.popularTweets = popularTweets;
    ctrl.refine = refine;

    function getTweets() {
        $http.get('/tweets')
            .then(function (res) {
                ctrl.tweetObj = res.data;
                if (res.status === 200) {
                    ctrl.tweetObj.forEach(function(item,i){
                        ctrl.tweets.push(item.tweet)
                        ctrl.recentDate.push(item.timeElapsed);
                    })
                    for (var i = 0; i < ctrl.tweets.length; i++) {
                        var z = refine(ctrl.tweets[i]);
                        ctrl.refinedTweets.push(z[i]);
                    }
                }
                else {
                    res.json(err);
                }
                return ctrl.tweetObj;
            })
    }
function popularTweets() {
        $http.get('/pop')
            .then(function (res) {
                ctrl.popObj = res.data;
                if (res.status === 200) {
                    ctrl.popObj.forEach(function (item, i) {
                        ctrl.popTweets.push(item.tweet);
                        ctrl.popDate.push(item.timeElapsed);
                    });
                    for (var i = 0; i < ctrl.popTweets.length; i++) {
                       var refined = refine(ctrl.popTweets[i]);
                       ctrl.finalTweets.push(refined[i]);
                   }
            } 
                else {
                    res.json(err);
                }
                return ctrl.popObj;
            });
    } 
// end of popularTweets()
    function refine(incomingArray) {
           var wholeTweets=[];
           incomingArray.split(",");
           for (var i = 0; i < incomingArray.length; i++) {
                var pTweets = []; 
                //turn html entities into symbols or text
                var str = unescape(incomingArray);
                //remove hashtags
                var removeHash = new RegExp('#([^\\s]*)', '');
                str.replace(removeHash, '');
                //remove twitter handles
                var removeHandle = new RegExp('@([^\\s]*)', '');
                str.replace(removeHandle, '');
                //remove emojis
                var noEmojis = str.replace('/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g', '');
                pTweets.push(str);
                //remove urls
                for (var a = 0; a < pTweets.length; a++) { 
                    var httpLoc = pTweets[a].indexOf('https://t.co/');
                    if (httpLoc != -1 || httpLoc == ' ') {
                        var beforeHttp = pTweets[a].substring(0, httpLoc);
                        var remaining = pTweets[a].substring(httpLoc, pTweets[a].length);
                        var noLinks = str.replace(remaining, '');
                        wholeTweets.push(noLinks);
                    }
                    if (httpLoc == -1){
                        wholeTweets.push(pTweets[a]);
                    } 
               }
        }
        return wholeTweets;
      } 
   //close refine();

  
ctrl.getImages = getImages;
ctrl.imagesArray = [];
    function getImages() {
        return $http.get('/images')
            .then(function (res, err) {
                if (res.status == 200) {
                        for (var i = 0; i < res.data.length; i++) {
                            var imgObj = res.data[i].display_sizes[0].uri;
                            ctrl.imagesArray.push(imgObj);
                        }
                        return ctrl.imagesArray;
                    if (err) {
                        console.log(err);
                    } 
                } 
            })
    } 

//closing whole service
}