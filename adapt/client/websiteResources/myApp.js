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

const serverURL = "http://165.227.3.148:8080/";
//controls the login page screen
app.controller('myCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.login = function() {
      $http({
        method: 'Get',
        url: serverURL + 'api/Tips',
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
            url: serverURL + 'api/Tips',
          }).then(function successCallback(response) {
            $scope.tipsList = (response.data);
          }, function errorCallback(response) {
            alert("Error. while trying to retrieve the tips, Try Again!");
          });
    };

    $scope.newTipWebsites = new Array(2);
    $scope.addNewTip = function() {

        // $scope.newTipWebsites = [
        //   {'WebsiteName': 'WebsiteName1', 'WebURL': 'WebURL1'},
        //   {'WebsiteName': "WebsiteName2", 'WebURL': 'WebURL2'}
        // ];
        var dataObj = {
          name : $scope.newTip.Name,
          description : $scope.newTip.Description,
          websites: $scope.newTipWebsites,
          type:0
        };
        var res = $http.post(serverURL + 'api/Tips', dataObj);
        res.then(function(data, status, headers, config) {
          alert("New tip added to the database.");
          $location.url(serverURL + '#!/tips');
        }, function(data, status, headers, config) {
          alert( "failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty
        //
        $scope.newTip.Name = '';
        $scope.newTip.Description = '';
    };
}]);

