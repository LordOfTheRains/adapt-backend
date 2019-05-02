// Defines the functions and variables (excluding $rootScope) that
// the login page has available to it.

app.controller('loginCtrl', function($scope, $http, $window, $rootScope) {

  const serverURL = "http://142.93.198.244:8080/";
  $rootScope.isLoggedIn = false;

  // Logins the User (Partially Working)
  $scope.login = function() {
    var dataObj = {
      email: $scope.email,
      password: $scope.password
    };
    var res = $http.post(serverURL + 'api/Users/login', dataObj);
    res.then(function(data, status, headers, config) {
      alert("Login Worked");
      $window.location.href = '#!recommendations';
      $rootScope.isLoggedIn = true;
      $rootScope.email = $scope.email;
      sessionStorage.setItem("user", $scope.email);
    }, function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
  };
});