// Instantiates and starts the application

var app = angular.module('myApp', ['ngRoute', 'angularjs-dropdown-multiselect', 'ui.bootstrap']);

//Defines the route set up between pages, and determines the url address
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
        templateUrl: 'websiteResources/htmls/login.html',
        controller: 'loginCtrl'
    })
    .when("/tips", {
        templateUrl: 'websiteResources/htmls/tipManagement.html',
        controller: 'tipCtrl'
    })
    .when("/recommendations", {
        templateUrl: 'websiteResources/htmls/recommendationManagement.html',
        controller: 'recommendationCtrl'
    });
}]);
