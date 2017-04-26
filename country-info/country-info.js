angular.module('myApp').controller('CountryInfoCtrl', ['$uibModalInstance', '$scope', 'countryInfo',
    function ($uibModalInstance, $scope, countryInfo) {
        $scope.countryInfo = countryInfo;

        // $scope.ok = function () {
        //     $uibModalInstance.close();
        // };
        //
        // $scope.cancel = function () {
        //     $uibModalInstance.dismiss();
        // };

        $scope.goToSlide = function (slideNumber) {
            let allSlides = $('.step');
            let targetSlide = $('.step-' + slideNumber);

            allSlides.addClass('step-invisible');
            targetSlide.removeClass('step-invisible');
        };
    }]);
