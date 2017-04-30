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
        'imagesService', 'spinnerService', '$uibModal',
        function (
            $scope, countriesService, mapService,
            imagesService, spinnerService, $uibModal
        ) {
            $scope.countries = [];
            $scope.countriesPerPage = 10;
            $scope.currentPage = 1;
            $scope.searchQuery = '';

            $scope.showDetails = function (country) {
                spinnerService.start();
                countriesService
                    .getCountryTexts(country['Id'])
                    .then(function (res) {
                        if (res.data) {
                            country.textInfos = res.data;

                            spinnerService.stop();

                            let modalInstance = $uibModal.open({
                                animation: true,
                                templateUrl: 'country-info/country-info.html',
                                controller: 'CountryInfoCtrl',
                                resolve: {
                                    countryInfo: function () {
                                        return country;
                                    }
                                }
                            });

                            modalInstance.result.then(function () {
                                console.log('resolved');
                            }, function () {
                                console.log('rejected');
                            });
                        }
                    });
            };

            spinnerService.start();
            countriesService
                .getAllCountries()
                .then(function (res) {
                    let existingCountries = res.data;
                    let mapCountryCodes = Object.keys(mapService.COUNTRIES_PATHS);

                    $scope.countries = existingCountries.filter(function (country) {
                        return mapCountryCodes.indexOf(country['Id']) !== -1;
                    }).sort(function (a, b) {
                        return b['HappyIndex'] - a['HappyIndex'];
                    });

                    let promises = $scope.countries.map(function (country) {
                        return imagesService.preloadImage(country);
                    });
                    return Promise.all(promises);
                })
                .then(function () {
                    spinnerService.stop();
                });
        }]);
