angular.module('myApp').service('imagesService', [
    function () {
        function preloadImage (descriptor) {
            let imageURL = (typeof descriptor === 'string')
                ? descriptor
                : 'https://happynation.azurewebsites.net/Images/' +
                descriptor['ISO2'] + '.svg';

            return new Promise(function (resolve, reject) {
                let tmpImage = new Image();
                tmpImage.onload = function() {
                    return resolve(descriptor);
                };
                tmpImage.src = imageURL;
            });
        }

        return {
            preloadImage: preloadImage
        };
    }
]);
