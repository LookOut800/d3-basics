'use strict';

/**
 * @ngdoc overview
 * @name soofaApp
 * @description
 * # soofaApp
 *
 * Main module of the application.
 */
angular
  .module('soofaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/drink', {
        templateUrl: 'views/drink.html',
        controller: 'DrinkCtrl'
      })
      .when('/pie', {
        templateUrl: 'views/pie.html',
        controller: 'PieCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
