angular.module('myApp').service('countriesService', [
    '$http',
    function ($http) {
        function getAllCountries () {
            return $http({
                method: 'GET',
                url: 'http://peoplehappy.azurewebsites.net/api/index/countries'
            });
        }

        function getCountryInfo (countryID) {
            return $http({
                method: 'GET',
                url: 'http://peoplehappy.azurewebsites.net/api/index/countryInfo/' + countryID
            });
        }

        return {
            getAllCountries: getAllCountries,
            getCountryInfo: getCountryInfo
        };
    }
]);