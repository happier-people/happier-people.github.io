'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'myApp.map',
    'myApp.howCalculated',
    'myApp.authors',
    'myApp.goals',
    'myApp.rating'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/map'});
}]);

angular.module('myApp').controller('MainCtrl', [
    '$scope', '$location',
    function ($scope, $location) {
        $scope.menuClass = function (url) {
            return ($location.path().substr(0, url.length) === url) ? 'active' : '';
        };

        $scope.isOverlayShown = true;

        $scope.hideOverlay = function () {
            $scope.isOverlayShown = false;
        };
    }
]);