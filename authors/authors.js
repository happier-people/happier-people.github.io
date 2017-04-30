'use strict';

angular.module('myApp.authors', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/authors', {
        templateUrl: 'authors/authors.html',
        controller: 'AuthorsCtrl'
    });
}])
.controller('AuthorsCtrl', [
    '$scope', 'imagesService',
    function ($scope, imagesService) {
        [
            '/assets/olga-suldina.jpg',
            '/assets/vlad-kuznietsov.jpg',
            '/assets/anna-bilousova.jpg',
            '/assets/dmitry-shashkov.jpg'
        ].forEach(imagesService.preloadImage);
    }
]);