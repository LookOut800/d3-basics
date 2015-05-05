'use strict';

/**
 * @ngdoc function
 * @name soofaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the soofaApp
 */
angular.module('soofaApp')
  .controller('PieCtrl', function ($scope) {

    // $scope.charts = d3.range(10).map(function(){
    //   return d3.range(10).map(Math.random);
    // })
  $scope.shared = { data: [1] };
  $scope.charts = d3.range(10);
  $scope.chartClicked = function(){
    var n = Math.round(Math.random() * 9) + 1;
    $scope.shared.data = d3.range(n).map(function(d){ return Math.random(); });
  }
});
