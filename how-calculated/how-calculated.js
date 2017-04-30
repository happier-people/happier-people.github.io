'use strict';

angular.module('myApp.howCalculated', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/how-it-was-calculated', {
        templateUrl: 'how-calculated/how-calculated.html',
        controller: 'HowCalculatedCtrl'
    });

}])

.controller('HowCalculatedCtrl', [
    'imagesService', 'spinnerService',
    function (imagesService, spinnerService) {
        spinnerService.start();
        imagesService
            .preloadImage('https://happynation.azurewebsites.net/Content/Diagram.png')
            .then(function () {
                spinnerService.stop();
            });
    }]);