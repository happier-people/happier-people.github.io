angular.module('myApp').service('hiService', [
    function () {
        let MOODS = {
            CRYING: 'crying',
            SAD: 'sad',
            ALRIGHT: 'alright',
            HAPPY: 'happy'
        };

        function getMood (happinessIndex) {
            if ((happinessIndex >= 0) && (happinessIndex < 0.25)) {
                return MOODS.CRYING;
            }

            if ((happinessIndex >= 0.25) && (happinessIndex < 0.5)) {
                return MOODS.SAD;
            }

            if ((happinessIndex >= 0.5) && (happinessIndex < 0.75)) {
                return MOODS.ALRIGHT;
            }

            if ((happinessIndex >= 0.75) && (happinessIndex <= 1)) {
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
