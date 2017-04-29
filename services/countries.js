angular.module('myApp').service('countriesService', [
    '$http',
    function ($http) {
        function getAllCountries () {
            return $http({
                method: 'GET',
                url: 'https://happynation.azurewebsites.net/api/info/countries'
            });
        }

        function getCountryInfo (countryCode) {
            return $http({
                method: 'GET',
                url: 'https://happynation.azurewebsites.net/api/info/CountryInfo/' + countryCode
            });
        }

        return {
            getAllCountries: getAllCountries,
            getCountryInfo: getCountryInfo
        };
    }
]);