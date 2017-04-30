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

        $scope.greetings = [
            "Marhaba", "Barev", "Heyello", "Kaixo", "Gruess gott",
            "Namaskar", "Zdraveite", "Mingalarbar", "Hola", "Hafa adai",
            "Nay ho", "Ni hau", "Mambo", "Boke", "Ahoj",
            "Hej", "Goedendag", "Saluton", "Salut", "Dia duit",
            "Gamardjoba", "Tag", "Kem che", "Yia sou", "Aloha",
            "Shalom", "Namaste", "Magyar jo napot", "Nde-ewo", "Halo",
            "Ciao", "Ohayou gozaimasu", "Namaskara", "Nook-neck", "Ahn nyeong ha se yo",
            "Choni", "Sabaidee", "Salve", "Labdien", "Mbote",
            "Laba diena", "Namaskkaram", "Kia ora", "Namaskar", "Niltze",
            "Dumelang", "Hallo", "Salaam", "Dzien dobry", "Salut",
            "Zdravstvuyte", "Talofa", "Salamaleikum", "Zdravo", "Dobry den",
            "Zhivyo", "Howzit", "Jambo", "Hej", "Vanakkam",
            "Baagunnara", "Bondia", "Li Ho", "Nong hao",
            "Minjhani", "Merhaba", "Pryvit", "Adaab", "Xin chào",
            "Shwmai", "Sholem aleikhem", "Sawubona", "Halo",
            "Sannu", "Namascara", "Min-ga-la-ba", "Ngi ho", "Prannam"
        ];
        $scope.selectedGreeting = $scope.greetings [ Math.floor( Math.random() * $scope.greetings.length ) ];
    }
]);
