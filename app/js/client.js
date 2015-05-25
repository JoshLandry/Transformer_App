'use strict';

require('angular/angular');
require('angular-route');

var transphormApp = angular.module('transphormApp', ['ngRoute']);

//controllers
require('./images/controllers/images_controller')(transphormApp);

console.log('my code really does things');

transphormApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/image_menu', {
    templateUrl: 'templates/image_menu.html'
  })
  .when('/original_image', {
    templateUrl: 'templates/original_image.html'
  })
  .when('/transformed_image', {
    templateUrl: 'templates/transformed_image.html'
  })
  .otherwise({
    templateUrl: 'templates/welcome.html'
  })
}]);