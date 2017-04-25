'use strict';

angular.module('myApp.goals', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/our-goals', {
            templateUrl: 'goals/goals.html',
            controller: 'GoalsCtrl'
        });
    }])

    .controller('GoalsCtrl', [function() {

    }]);