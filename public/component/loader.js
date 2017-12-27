var app = angular.module('twitterApp');

app.directive('loading', function (){
    return {
        restrict:'E',
        replace: true,
        scope:{
            showme: '=',
            showerror: '=',
            errormessage: '='
        },
        templateUrl: '../partials/loading.html'
    }
})