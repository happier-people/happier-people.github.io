angular.module('myApp').controller('CountryInfoCtrl', [
    '$uibModalInstance', '$scope', 'hiService',
    'countryInfo',
    function (
        $uibModalInstance, $scope, hiService,
        countryInfo
    ) {
        $scope.countryInfo = countryInfo;
        $scope.countryMood = hiService.getMood(countryInfo['HappyIndex']);

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
