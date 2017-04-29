'use strict';

angular.module('myApp.rating', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/rating', {
            templateUrl: 'rating/rating.html',
            controller: 'RatingCtrl'
        });
    }])

    .controller('RatingCtrl', [
        '$scope', 'countriesService', 'mapService',
        function (
            $scope, countriesService, mapService
        ) {
            $scope.countries = [];
            $scope.countriesPerPage = 10;
            $scope.currentPage = 1;
            $scope.searchQuery = '';

            countriesService
                .getAllCountries()
                .then(function (res) {
                    let existingCountries = res.data;
                    let mapCountryCodes = Object.keys(mapService.COUNTRIES_PATHS);

                    $scope.countries = existingCountries.filter(function (country) {
                        return mapCountryCodes.indexOf(country['Id']) !== -1;
                    });
                })
        }]);
