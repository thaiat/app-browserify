'use strict';
var angular = require('angular');
var YoobicCore = require('yoobic-angular-core')();

var app = angular.module('app', [YoobicCore.name]);
app.controller('home', [
    '$scope',
    function($scope) {
        $scope.message = 'Welcome ';
    }
]);
