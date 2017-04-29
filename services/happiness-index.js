angular.module('myApp').service('hiService', [
    function () {
        let MOODS = {
            CRYING: 'crying',
            SAD: 'sad',
            ALRIGHT: 'alright',
            HAPPY: 'happy'
        };

        function getMood (happinessIndex) {
            if ((happinessIndex >= 0) && (happinessIndex < 0.3757508518)) {
                return MOODS.CRYING;
            }

            if ((happinessIndex >= 0.3757508518) && (happinessIndex < 0.4592707355)) {
                return MOODS.SAD;
            }

            if ((happinessIndex >= 0.4592707355) && (happinessIndex < 0.566336456)) {
                return MOODS.ALRIGHT;
            }

            if ((happinessIndex >= 0.566336456) && (happinessIndex <= 1)) {
                return MOODS.HAPPY;
            }

            return MOODS.ALRIGHT;
        }

        return {
            MOODS: MOODS,
            getMood: getMood
        };
    }
]);
