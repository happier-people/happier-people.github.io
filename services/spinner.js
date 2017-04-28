angular.module('myApp').service('spinnerService', [
    function () {
        let spinner = $('.spinner-overlay');

        function start () {
            spinner.css({
                'display': 'flex'
            });
        }

        function stop () {
            spinner.css({
                'display': 'none'
            });
        }

        return {
            start: start,
            stop: stop
        };
    }
]);