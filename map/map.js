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
    'hiService', 'spinnerService',
    function (
        $scope, $uibModal, countriesService,
        hiService, spinnerService
    ) {

        let palette = [
            '#f6d258', '#efcec5', '#d1af94',
            '#88b14b', '#ef562d', '#d13076',
            '#5587a2', '#5c7148', '#0c4c8a'
        ];

        function generateColors (){
            let colors = {},
                key;

            for (key in map.regions) {
                // noinspection JSUnfilteredForInLoop
                colors[key] = palette[Math.floor(Math.random()*palette.length)];
            }
            return colors;
        }

        function preloadImage (descriptor) {
            let imageURL = (typeof descriptor === 'string')
                ? descriptor
                : 'https://peoplehappy.azurewebsites.net/Images/' +
                    descriptor['ISO2'] + '.svg';

            return new Promise(function (resolve, reject) {
                let tmpImage = new Image();
                tmpImage.onload = function() {
                    return resolve(descriptor);
                };
                tmpImage.src = imageURL;
            });
        }

        function onRegionClick (event, code) {
            spinnerService.start();
            countriesService
                .getCountryInfo(code)
                .then(function (res) {
                    if (res.data) {
                        return preloadImage(res.data);
                    }
                })
                .then(function (countryInfo) {
                    spinnerService.stop();

                    let modalInstance = $uibModal.open({
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
            let targetCountry = $scope.countries.filter(function (country) {
                return country['Id'] === code;
            })[0];
            if (!targetCountry) {
                el.html(el.html() + ': no data');
            } else {
                let mood = hiService.getMood(targetCountry['HappyIndex']);
                el.html(el.html() + ': ' + mood);
            }
        }

        let map = new jvm.Map({
            map: 'world_mill',
            container: $('#map-container'),
            backgroundColor: '#97d5e0',
            onRegionClick: onRegionClick,
            onRegionTipShow: onRegionTipShow,
            series: {
                regions: [{
                    attribute: 'fill'
                }]
            }
        });
        map.series.regions[0].setValues(generateColors());

    countriesService.getAllCountries()
        .then(function (res) {
            $scope.countries = res.data;
        })
        .catch(function (err) {
            console.log(err);
        });

    [
        'assets/spinner.svg',
        'assets/dude-happy.png',
        'assets/dude-alright.png',
        'assets/dude-sad.png',
        'assets/dude-crying.png'
    ].forEach(preloadImage);
}]);