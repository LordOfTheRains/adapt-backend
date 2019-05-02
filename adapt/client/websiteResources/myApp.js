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
    })
    .otherwise({redirectTo: '/'});
}]);
app.run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    if (next.templateUrl === "websiteResources/htmls/tipManagement.html") {
      if(!loginService.getPermission('loggedIn')) {
        $location.path('/');
      }
    }
    if (next.templateUrl === "websiteResources/htmls/recommendationManagement.html") {
        if(!loginService.getPermission('loggedIn')) {
          $location.path('/');
        }
    }
  });
}]);

app.directive('fileModel', ['$parse', function ($parse) {
  return {
     restrict: 'A',
     link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        
        element.bind('change', function() {
           scope.$apply(function() {
              modelSetter(scope, element[0].files[0]);
           });
        });
     }
  };
}]);

app.service('loginService', [function() {
  var permissions = {
    loggedIn: false
  };
  this.setPermission = function(permission, value) {
    permissions[permission] = value;
  }
  this.getPermission = function(permission) {
    return permissions[permission] || false;
  }
}]);
