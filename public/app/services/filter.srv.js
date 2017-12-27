angular.module('twitterApp')
    .service('filterSrv', filterSrv);

function filterSrv($http) {
    var ctrl = this;

    ctrl.getTweets = getTweets;
    ctrl.refine = refine;

    ctrl.tweets = [];
    ctrl.date=[];
    ctrl.refTweets = [];

    function getTweets() {
        $http.get('/tweets')
            .then(function (res) {
                if (res.status === 200) {
                    ctrl.tweets = res.data[0];
                    ctrl.date = ctrl.date.push(res.data[1]);
                    ctrl.refine(ctrl.tweets);
                    return [ctrl.refTweets, ctrl.date];
                }
                else {
                    res.json(err);
                }
            })
    }

    function refine() {
        for (var i = 0; i < ctrl.tweets.length; i++) {
            ctrl.pTweets =[];
            var raw = ctrl.tweets[i];
            //turn html entities into symbols
            var str = decodeURI(raw);
            //remove hashtags
            var removeHash = new RegExp('#([^\\s]*)', '');
            str.replace(removeHash, '');
            //remove twitter handles
            var removeHandle = new RegExp('@([^\\s]*)', '');
            str.replace(removeHandle, '');
            //remove emojis
            var noEmojis = str.replace('/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g', '');
            ctrl.pTweets.push(str);
            for (var a = 0; a < ctrl.pTweets.length; a++) {
            // remove urls
                var httpLoc = ctrl.pTweets[a].indexOf('https://t.co/');
                if (httpLoc != -1 || httpLoc == ' ') {
               var beforeHttp = ctrl.pTweets[a].substring(0, httpLoc);
                var remaining = ctrl.pTweets[a].substring(httpLoc, ctrl.pTweets[a].length);
                var noLinks = str.replace(remaining, '');
                ctrl.refTweets.push(beforeHttp);
            }
            } 
    } return ctrl.refTweets;
   //close refine();
   }
  
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