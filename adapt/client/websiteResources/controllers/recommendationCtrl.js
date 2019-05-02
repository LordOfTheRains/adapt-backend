// Defines the functions and variables (excluding $rootScope) that
// the recommendation page has available to it.

app.controller('recommendationCtrl', function($scope, $http, $window, $modal, $rootScope) {

  const serverURL = "http://142.93.198.244:8080/";

  // Retrieves all currently existing recommendations that are inside the database
  $scope.pageInit = function() {
    $rootScope.isLoggedIn = true;
    $rootScope.email = sessionStorage.getItem("user");
    $scope.recommendationsList = [];
    $http({
      method: 'Get',
      url: serverURL + 'api/Recommendations',
    }).then(function successCallback(response) {
        $scope.recommendationsList = (response.data);
    }, function errorCallback(response) {
      alert("Error. while trying to retrieve the recommendations, Try Again!");
    });
  };
  
  // Deletes the selected recommendation from the database
  $scope.deleteRecommendation = function(item) {
    var index = $scope.recommendationsList.indexOf(item);
    var itemID = $scope.recommendationsList[index].id;
    var res = $http.delete(serverURL + 'api/Recommendations/' + itemID);
    res.then(function(data, status, headers, config) {
      alert("Recommendation removed from the database.");
      $window.location.reload();
    }, function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
  };
  
  // Opens the update recommendation modal form
  $scope.openUpdateRecommendationForm = function(item) {
    var modalInstance = $modal.open({
      templateUrl: '/websiteResources/htmls/updateRecommendationForm.html',
      controller: "recommendationFormCtrl",
      resolve: {
        recommendation: function () {
          return item;
        }
      }
    });
  };

  // Opens the new recommendation modal form
  $scope.openNewRecommendationForm = function() {
    var modalInstance = $modal.open({
      templateUrl: '/websiteResources/htmls/newRecommendationForm.html',
      controller: "recommendationFormCtrl",
      resolve: {
        recommendation: function () {
          return "";
        }
      }
    });
  };
});