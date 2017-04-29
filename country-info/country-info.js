angular.module('myApp').controller('CountryInfoCtrl', [
    '$uibModalInstance', '$scope', 'hiService',
    '$timeout', 'countryInfo',
    function (
        $uibModalInstance, $scope, hiService,
        $timeout,countryInfo
    ) {
        $scope.countryInfo = countryInfo;
        $scope.countryMood = hiService.getMood(countryInfo['HappyIndex']);

        $scope.closeModal = function () {
            $uibModalInstance.close();
        };

        $scope.activeSlide = 'Nature';

        $scope.goToSlide = function (slideName) {
            let allSlides = $('.slide');
            let targetSlide = $('.slide-' + slideName);

            allSlides.addClass('slide-invisible');
            targetSlide.removeClass('slide-invisible');

            $scope.activeSlide = slideName;
        };

        $timeout(function () {
            $scope.goToSlide($scope.activeSlide);
        }, 0);
    }]);
