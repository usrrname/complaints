var app = angular.module("twitterApp").controller('loaderCtrl', loaderCtrl);  
  
function loaderCtrl($http, $q){  
    var ctrl = this;  
    ctrl.title = "Loader Directive Example.";  
    ctrl.isLoading = false;  
    ctrl.errorMessage = "";  
  
    ctrl.getData = function () {  
        ctrl.isLoading = true;  
        var deferred = $q.defer();  
        $http.get('/tweets').success(function (data) {  
              deferred.resolve(data);  
              ctrl.isLoading = false;  
          }).error(function (err) {  
              ctrl.isLoading = false;  
              ctrl.errorMessage = "OOPS! Error While Fetching Data from Server.";  
              console.log('Error retrieving data');  
              deferred.reject(err);  
          });  
        return deferred.promise;  
    }  
  
    ctrl.getData();  
};  