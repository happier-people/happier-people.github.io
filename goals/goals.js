'use strict';

angular.module('myApp.goals', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/our-goals', {
            templateUrl: 'goals/goals.html',
            controller: 'GoalsCtrl'
        });
    }])

    .controller('GoalsCtrl', [
        '$scope',
        function ($scope) {
            $scope.links = [
                'http://jvectormap.com/',
                'http://lpi.worldbank.org/',
                'https://unstats.un.org',
                'http://sedac.ciesin.columbia.edu',
                'https://www.numbeo.com',
                'http://happyplanetindex.org',
                'https://github.com/happier-people/happier-people.github.io'
            ];
        }
    ]);