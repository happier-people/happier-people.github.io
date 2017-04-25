'use strict';

angular.module('myApp.map', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'map/map.html',
    controller: 'MapCtrl'
  });
}])

.controller('MapCtrl', [
    '$scope', '$uibModal', 'countriesService',
    function ($scope, $uibModal, countriesService) {

        var palette = ['#66C2A5', '#FC8D62', '#8DA0CB', '#E78AC3', '#A6D854'];

        function generateColors (){
            var colors = {},
                key;

            for (key in map.regions) {
                // noinspection JSUnfilteredForInLoop
                colors[key] = palette[Math.floor(Math.random()*palette.length)];
            }
            return colors;
        }

        function onRegionClick (event, code) {
            var requestedCountry = $scope.countries
                .filter(function (country) {
                    return country['Code'] === code;
                })[0];

            if (!requestedCountry) {
                return console.log('country not found');
            }

            countriesService.getCountryInfo(requestedCountry['Id'])
                .then(function (res) {
                    var countryInfo = res.data;
                    console.log(requestedCountry['Code']);

                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'country-info/country-info.html',
                        controller: 'CountryInfoCtrl',
                        resolve: {
                            countryInfo: function () {
                                return countryInfo;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        console.log('resolved');
                    }, function () {
                        console.log('rejected');
                    });
                });
        }

        function onRegionTipShow (e, el, code) {
            el.html(el.html() + ' (code: ' + code + ')');
        }

        var map = new jvm.Map({
            map: 'world_mill',
            container: $('#map-container'),
            backgroundColor: '#77c9d4',
            onRegionClick: onRegionClick,
            onRegionTipShow: onRegionTipShow,
            series: {
                regions: [{
                    attribute: 'fill'
                }]
            }
        });
        map.series.regions[0].setValues(generateColors());

    // $('#map-container').vectorMap({
    //     map: 'world_mill',
    //     backgroundColor: '#77c9d4',
    //     onRegionClick: onRegionClick,
    //     onRegionTipShow: onRegionTipShow
    // });

    countriesService.getAllCountries()
        .then(function (res) {
            $scope.countries = res.data;
        });
}]);