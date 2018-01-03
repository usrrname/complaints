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
                  var helpfulElf = refine(ctrl.tweets);
                  helpfulElf.forEach(function(item, i){
                    ctrl.refinedTweets.push(helpfulElf[i]);
                  })
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
                    var tempTweets=[];
                    ctrl.popObj.forEach(function (item, index) {
                        tempTweets.push(item.tweet);
                        ctrl.popDate.push(item.timeElapsed);
                    });
                    var helper = refine(ctrl.tempTweets);
                    helper.forEach(function (item, i) {
                        ctrl.popTweets.push(helper[i]);
                        console.log(ctrl.popTweets);
                    });
                    return ctrl.popObj;
            } 
                else {
                    res.json(err);
                }
            })
    } 
// end of popularTweets()
    function refine(incomingArray) {

           var wholeTweets = [];
           for (var i = 0; i < incomingArray.length; i++) {
               pTweets = []; 
                //turn html entities into symbols
               var str = decodeURI(incomingArray[i]);
                //remove hashtags
                var removeHash = new RegExp('#([^\\s]*)', '');
                str.replace(removeHash, '');
                //remove twitter handles
                var removeHandle = new RegExp('@([^\\s]*)', '');
                str.replace(removeHandle, '');
                //remove emojis
                var noEmojis = str.replace('/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g', '');
                pTweets.push(str);
                for (var a = 0; a < pTweets.length; a++) { 
                    // remove urls
                    var httpLoc = pTweets[a].indexOf('https://t.co/');
                    if (httpLoc != -1 || httpLoc == ' ') {
                        var beforeHttp = pTweets[a].substring(0, httpLoc);
                        var remaining = pTweets[a].substring(httpLoc, pTweets[a].length);
                        var noLinks = str.replace(remaining, '');
                        wholeTweets.push(noLinks);
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