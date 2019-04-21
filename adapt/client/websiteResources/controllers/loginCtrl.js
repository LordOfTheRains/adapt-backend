// Defines the functions and variables (excluding $rootScope) that
// the login page has available to it.

app.controller('loginCtrl', function($scope, $http, $location, $rootScope, loginService) {

  const serverURL = "http://165.227.3.148:8080/";
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
      loginService.setPermission("loggedIn", true);
      $location.path('/recommendations');
      $rootScope.email = $scope.email;
      sessionStorage.setItem("accessToken", data.id)
      sessionStorage.setItem("user", $scope.email);
    }, function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
  };

  $scope.logout = function(){

  };
});