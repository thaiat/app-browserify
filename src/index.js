'use strict';
var angular = require('angular');
var app = angular.module('app', []);
app.controller('home', function($scope) {
    $scope.message = 'Welcome';
});
