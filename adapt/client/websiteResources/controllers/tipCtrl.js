// Defines the functions and variables (excluding $rootScope) that
// the tip page has available to it.

app.controller('tipCtrl', function($scope, $http, $window, $modal, $rootScope) {

  const serverURL = "http://142.93.198.244:8080/";

  // Gets all tips currently inside the database
  $scope.pageInit = function() {
    $rootScope.isLoggedIn = true;
    $rootScope.email = sessionStorage.getItem("user");
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
  
  // Deletes the selected tip from the database
  $scope.deleteTip = function(item) {
    var index = $scope.tipsList.indexOf(item);
    var itemID = $scope.tipsList[index].id;
    var res = $http.delete(serverURL + 'api/Tips/' + itemID);
    res.then(function(data, status, headers, config) {
      alert("Tip removed from the database.");
      $window.location.reload();
    }, function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
  };
  
  $scope.openUpdateForm = function(item) {
    var modalInstance = $modal.open({
      templateUrl: './websiteResources/htmls/updateTipForm.html',
      controller: "tipFormCtrl",
      resolve: {
        tip: function () {
          return item;
        }
      }
    });
  }
  

  $scope.openNewTipForm = function() {
    var modalInstance = $modal.open({
      templateUrl: './websiteResources/htmls/newTipForm.html',
      controller: "tipFormCtrl",
      resolve: {
        tip: function () {
          return "";
        }
      }
    });
  };
});
