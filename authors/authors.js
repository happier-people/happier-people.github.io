'use strict';

angular.module('myApp.authors', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/authors', {
        templateUrl: 'authors/authors.html',
        controller: 'AuthorsCtrl'
    });
}])
.controller('AuthorsCtrl', [
    '$scope',
    function ($scope) {
        $scope.authors = [
            {
                name: 'Olga Suldina',
                photo: 'http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non pharetra urna. Etiam ac magna est. Sed metus arcu, lobortis non mauris et, vehicula iaculis neque. Phasellus eget nisl in eros bibendum lacinia. Quisque mi mi, interdum vitae feugiat vitae, accumsan faucibus nibh. Quisque condimentum molestie lacus sit amet imperdiet. Vestibulum ac odio felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus accumsan dapibus velit sit amet semper. Nunc vitae nisi metus.'
            },
            {
                name: 'Serhij Mirnyi',
                photo: 'http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non pharetra urna. Etiam ac magna est. Sed metus arcu, lobortis non mauris et, vehicula iaculis neque. Phasellus eget nisl in eros bibendum lacinia. Quisque mi mi, interdum vitae feugiat vitae, accumsan faucibus nibh. Quisque condimentum molestie lacus sit amet imperdiet. Vestibulum ac odio felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus accumsan dapibus velit sit amet semper. Nunc vitae nisi metus.'
            },
            {
                name: 'Anna Bilousova',
                photo: 'http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non pharetra urna. Etiam ac magna est. Sed metus arcu, lobortis non mauris et, vehicula iaculis neque. Phasellus eget nisl in eros bibendum lacinia. Quisque mi mi, interdum vitae feugiat vitae, accumsan faucibus nibh. Quisque condimentum molestie lacus sit amet imperdiet. Vestibulum ac odio felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus accumsan dapibus velit sit amet semper. Nunc vitae nisi metus.'
            },
            {
                name: 'Vladyslav Kuznietsov',
                photo: 'http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non pharetra urna. Etiam ac magna est. Sed metus arcu, lobortis non mauris et, vehicula iaculis neque. Phasellus eget nisl in eros bibendum lacinia. Quisque mi mi, interdum vitae feugiat vitae, accumsan faucibus nibh. Quisque condimentum molestie lacus sit amet imperdiet. Vestibulum ac odio felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus accumsan dapibus velit sit amet semper. Nunc vitae nisi metus.'
            },
            {
                name: 'Dmitry Shashkov',
                photo: 'http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non pharetra urna. Etiam ac magna est. Sed metus arcu, lobortis non mauris et, vehicula iaculis neque. Phasellus eget nisl in eros bibendum lacinia. Quisque mi mi, interdum vitae feugiat vitae, accumsan faucibus nibh. Quisque condimentum molestie lacus sit amet imperdiet. Vestibulum ac odio felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus accumsan dapibus velit sit amet semper. Nunc vitae nisi metus.'
            },
            {
                name: 'Dmitry German',
                photo: 'http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non pharetra urna. Etiam ac magna est. Sed metus arcu, lobortis non mauris et, vehicula iaculis neque. Phasellus eget nisl in eros bibendum lacinia. Quisque mi mi, interdum vitae feugiat vitae, accumsan faucibus nibh. Quisque condimentum molestie lacus sit amet imperdiet. Vestibulum ac odio felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus accumsan dapibus velit sit amet semper. Nunc vitae nisi metus.'
            }
        ];
    }
]);