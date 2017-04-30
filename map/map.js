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
    'hiService', 'spinnerService', 'mapService',
    'imagesService',
    function (
        $scope, $uibModal, countriesService,
        hiService, spinnerService, mapService,
        imagesService
    ) {
        let palette = [
            '#f6d258', '#efcec5', '#d1af94',
            '#88b14b', '#F48F74', '#DF6F9F',
            '#5587a2', '#829E67', '#1273D0'
        ];

        function generateColors (){
            let colors = {};

            for (let key in map.regions) {
                // noinspection JSUnfilteredForInLoop
                colors[key] = palette[Math.floor(Math.random()*palette.length)];
            }
            return colors;
        }

        function onRegionClick (event, code) {
            let targetCountry = $scope.countries.filter(function (country) {
                return country['Id'] === code;
            })[0];

            spinnerService.start();
            countriesService
                .getCountryTexts(code)
                .then(function (res) {
                    if (res.data) {
                        targetCountry.textInfos = res.data;

                        spinnerService.stop();

                        let modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'country-info/country-info.html',
                            controller: 'CountryInfoCtrl',
                            resolve: {
                                countryInfo: function () {
                                    return targetCountry;
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
        }

        $scope.isAssistantShown = false;
        $scope.assistantIcons = [
            { filter: 'NatureIndex', icon: 'fa-leaf' },
            { filter: 'JudgeIndex', icon: 'fa-balance-scale' },
            { filter: 'InfrastructureIndex', icon: 'fa-road' },
            { filter: 'HungerIndex', icon: 'fa-cutlery' }
        ];

        function onRegionOver (e, code) {
            $scope.currentCountry = $scope.countriesOnMap.filter(function (country) {
                return country['Id'] === code
            })[0];
            $scope.currentCountryMood = hiService.getMood($scope.currentCountry['HappyIndex']);

            $scope.isAssistantShown = true;
            $scope.$apply();
        }
        function onRegionOut (e, code) {
            $scope.isAssistantShown = false;
            $scope.$apply();
        }

        function chunkify (array, n) {
            let len = array.length;
            let out = [];
            let i = 0;

            while (i < len) {
                let size = Math.ceil((len - i) / n--);
                out.push(array.slice(i, i += size));
            }

            return out;
        }

        $scope.filterIcons = [
            { filter: 'Global', icon: 'fa-globe' },
            { filter: 'NatureIndex', icon: 'fa-leaf' },
            { filter: 'JudgeIndex', icon: 'fa-balance-scale' },
            { filter: 'InfrastructureIndex', icon: 'fa-road' },
            { filter: 'HungerIndex', icon: 'fa-cutlery' }
        ];
        $scope.activeFilter = 'Global';

        $scope.filterMap = function (filterBy) {
            $scope.activeFilter = filterBy;

            if (filterBy === 'Global') {
                return map.series.regions[0].setValues(generateColors());
            }

            // clear those without data
            // todo: optimize this
            let clearColors = {};
            for (let key in map.regions) {
                clearColors[key] = '#fff';
            }
            map.series.regions[0].setValues(clearColors);

            let palettes = {
                'NatureIndex': ["#FFFFFF", "#EFF6EF", "#EBF4EB", "#E7F2E7", "#E2EFE2", "#DBECDB", "#D2E8D2", "#C7E3C7", "#A9D4A9", "#A9D4A9", "#94CA94", "#7ABD7A", "#5AAD5A", "#329932", "#008000"],
                'JudgeIndex': ["#FFFFFF", "#ECDEDE", "#E5D0D0", "#DBBCBC", "#D3ACAC", "#CFA3A3", "#CA9999", "#C58E8E", "#BF8282", "#B87575", "#B16666", "#A95555", "#A04343", "#962F2F", "#8B1919", "#7F0000"],
                'InfrastructureIndex': ["#FFFFFF", "#F0F0F0", "#EAEAEA", "#E5E5E5", "#DFDFDF", "#D8D8D8", "#CFCFCF", "#C3C3C3", "#B5B5B5", "#A3A3A3", "#999999", "#8E8E8E", "#828282", "#757575", "#666666"],
                'HungerIndex': ["#FFFFFF", "#FFF7EB", "#FFF3DF", "#FFEBCB", "#FFE7BF", "#FFE2AF", "#FFDB9B", "#FFD282", "#FFCE75", "#FFC966", "#FFC355", "#FFBD43", "#FFB62F", "#FFAE19", "#FFA500"]
            };

            let palette = palettes[filterBy];
            let colors = {};

            let sortedByFilter = $scope.countriesOnMap.sort(function (a, b) {
                return a[filterBy] - b[filterBy];
            });

            let arrays = chunkify(sortedByFilter, palette.length, true);
            arrays.forEach(function (array, index) {
                array.forEach(function (country) {
                    let key = country['Id'];
                    colors[key] = palette[index];
                })
            });

            map.series.regions[0].setValues(colors);
        };

        jQuery.fn.vectorMap('addMap', 'world_mill', {
            "insets": [{
                "width": 900,
                "top": 0,
                "height": 440.7063107441331,
                "bbox": [{
                    "y": -12671671.123330014,
                    "x": -20004297.151525836
                }, {
                    "y": 6930392.025135122,
                    "x": 20026572.394749384
                }],
                "left": 0
            }],
            "paths": mapService.COUNTRIES_PATHS,
            "height": 440.7063107441331,
            "projection": {
                "type": "mill",
                "centralMeridian": 11.5
            },
            "width": 900.0
        });

        let map = new jvm.Map({
            map: 'world_mill',
            container: $('#map-container'),
            backgroundColor: '#97d5e0',
            onRegionOver: onRegionOver,
            onRegionOut: onRegionOut,

            onRegionClick: onRegionClick,
            // onRegionTipShow: onRegionTipShow,
            series: {
                regions: [{
                    attribute: 'fill'
                }]
            }
        });
        map.series.regions[0].setValues(generateColors());

        spinnerService.start();
        countriesService.getAllCountries()
            .then(function (res) {
                $scope.countries = res.data;

                let mapCountryCodes = Object.keys(mapService.COUNTRIES_PATHS);
                $scope.countriesOnMap = $scope.countries.filter(function (country) {
                    return mapCountryCodes.indexOf(country['Id']) !== -1;
                });

                let promises = $scope.countriesOnMap.map(function (country) {
                    return imagesService.preloadImage(country);
                });
                return Promise.all(promises);
            })
            .then(function () {
                spinnerService.stop();
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
        ].forEach(imagesService.preloadImage);
    }
]);