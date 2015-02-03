'use strict';
var angular = require('angular');
var YoobicCore = require('yoobic-angular-core')();

var app = angular.module('app', [YoobicCore.name]);
app.controller('home', [
    '$scope',
    YoobicCore.name + '.directiveBinder',
    function($scope, directiveBinder) {
        $scope.message = 'Welcome, 12 + 14 = ' + directiveBinder.add(12, 14);
    }
]);
