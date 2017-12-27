angular.module('timeApp', ['angularMoment'])

    .controller('timeCtrl', function () {

        var vm = this;

        vm.time = new Date();

    });