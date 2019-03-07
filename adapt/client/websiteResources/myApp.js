var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
        templateUrl: 'websiteResources/htmls/login.html',
        controller: 'myCtrl'
    })
    .when("/tips", {
        templateUrl: 'websiteResources/htmls/tipManagement.html',
        controller: 'myCtrl'
    })
    .when("/recommendations", {
        templateUrl: 'websiteResources/htmls/recommendationManagement.html'
    })
    .when("/tipform", {
        templateUrl: 'websiteResources/htmls/tipForm.html',
        controller: 'myCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

//controls the login page screen
app.controller('myCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.login = function() {
      $http({
        method: 'Get',
        url: 'http://localhost:3000/api/Tips',
      }).then(function successCallback(response) {
        alert("Form submitted and request sent.");
      }, function errorCallback(response) {
        alert("Error. while trying to login, Try Again!");
      });
    };

    $scope.getTips = function() {
        $scope.tipsList = [];
        $http({
            method: 'Get',
            url: 'http://localhost:3000/api/Tips',
          }).then(function successCallback(response) {
            $scope.tipsList = (response.data);
          }, function errorCallback(response) {
            alert("Error. while trying to retrieve the tips, Try Again!");
          });
    };

    $scope.addNewTip = function() {

        $scope.newTipWebsites = [
          {'WebsiteName': 'WebsiteName1', 'WebURL': 'WebURL1'},
          {'WebsiteName': "WebsiteName2", 'WebURL': 'WebURL2'}
        ];

        var dataObj = {
          Name : $scope.newTip.Name,
          Description : $scope.newTip.Description,
          Websites: $scope.newTipWebsites
        };
        var res = $http.post('http://localhost:3000/api/Tips', dataObj);
        res.success(function(data, status, headers, config) {
          alert("New tip added to the database.");
          $location.url("http://localhost:3000/#!/tips");
        });
        res.error(function(data, status, headers, config) {
          alert( "failure message: " + JSON.stringify({data: data}));
        });		
        // Making the fields empty
        //
        $scope.newTip.Name = '';
        $scope.newTip.Description = '';
    };
}]);

