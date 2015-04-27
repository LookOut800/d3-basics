'use strict';

/**
 * @ngdoc function
 * @name soofaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soofaApp
 */
angular.module('soofaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
