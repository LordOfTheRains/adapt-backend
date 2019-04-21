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
      var response = data;
      var accesstoken = response.data.id;
      sessionStorage.setItem("user", $scope.email);
      sessionStorage.setItem("accesstoken", accesstoken);
      loginService.setPermission("loggedIn", true);
      $location.path('/recommendations');
      $rootScope.email = $scope.email;
    }, function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
  };

  //Logs the user out and resets permissions and rootScope variables/sessionStorage
  $scope.logout = function(){
    var accesstoken = sessionStorage.getItem("accesstoken");
    var res = $http.post(serverURL + "api/Users/logout?access_token=" + accesstoken);
    res.then(function(data, status, headers, config) {
      alert("Logging out user.")
      loginService.setPermission("loggedIn", false);
      $rootScope.email = "";
      sessionStorage.clear();
      $location.path("/");
    }, function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
  };
});