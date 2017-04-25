angular.module('myApp').controller('CountryInfoCtrl', ['$uibModalInstance', '$scope', 'countryInfo',
    function ($uibModalInstance, $scope, countryInfo) {
        $scope.countryInfo = countryInfo;

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };

    }]);
