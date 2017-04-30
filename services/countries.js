angular.module('myApp').service('countriesService', [
    '$http',
    function ($http) {
        function getAllCountries () {
            return $http({
                method: 'GET',
                url: 'https://happynation.azurewebsites.net/api/Info/Countries'
            });
        }

        function getCountryTexts (countryCode) {
            return $http({
                method: 'GET',
                url: 'https://happynation.azurewebsites.net/api/Info/GetCountryTextInfo?countryId=' + countryCode
            });
        }

        return {
            getAllCountries: getAllCountries,
            getCountryTexts: getCountryTexts
        };
    }
]);