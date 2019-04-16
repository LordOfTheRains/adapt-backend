// Defines the functions and variables (excluding $rootScope) that
// both the newRecommendationForm and updateRecommendationForm have available to them.

app.controller('recommendationFormCtrl', function($scope, $http, $window, $modalInstance, recommendation) {
    const serverURL = "http://165.227.3.148:8080/";
    $scope.newRecWebsites = new Array(2);
    $scope.selectedStates = []; 
    $scope.selectedIncomeBrackets = [];
    $scope.selectedGenders = [];
    $scope.selectedRoomTypes = [];
    $scope.selectedAges = [];

    $scope.roomTypeList = [{id: 1, label: "Kitchen"}, {id: 2, label: "Living Room"}, {id: 3, label: "Bedroom"}, {id: 4, label: "Bathroom"}];
    $scope.ageList = [{id: 1, label: "40-45"}, {id: 2, label: "45-50"}, {id: 3, label: "50-60"}, {id: 4, label: "60+"}];

    $scope.stateList = [  {id: 1, label: "Alabama"}, {id: 2, label: "Alaska"}, {id: 3, label: "Arizona"},
                            {id: 4, label: "Arkansas"}, {id: 5, label: "California"}, {id: 6, label: "Colorado"},
                            {id: 7, label: "Connnecticut"}, {id: 8, label: "Delaware"}, {id: 9, label: "Florida"},
                            {id: 10, label: "Georgia"}, {id: 11, label: "Hawaii"}, {id: 12, label: "Idaho"},
                            {id: 13, label: "Illinois"}, {id: 14, label: "Indiana"}, {id: 15, label: "Iowa"},
                            {id: 16, label: "Kansas"}, {id: 17, label: "Kentucky"}, {id: 18, label: "Louisiana"},
                            {id: 19, label: "Maine"}, {id: 20, label: "Maryland"}, {id: 21, label: "Massachusetts"},
                            {id: 22, label: "Michigan"}, {id: 23, label: "Minnesota"}, {id: 24, label: "Mississippi"},
                            {id: 25, label: "Missouri"}, {id: 26, label: "Montana"}, {id: 27, label: "Nebraska"},
                            {id: 28, label: "Nevada"}, {id: 29, label: "New Hampshire"}, {id: 30, label: "New Jersey"},
                            {id: 31, label: "New Mexico"}, {id: 32, label: "New York"}, {id: 33, label: "North Carolina"},
                            {id: 34, label: "North Dakota"}, {id: 35, label: "Ohio"}, {id: 36, label: "Oklahoma"},
                            {id: 37, label: "Oregon"}, {id: 38, label: "Pennsylvania"}, {id: 39, label: "Rhode Island"},
                            {id: 40, label: "South Carolina"}, {id: 41, label: "South Dakota"}, {id: 42, label: "Tennessee"},
                            {id: 43, label: "Texas"}, {id: 44, label: "Utah"}, {id: 45, label: "Vermont"},
                            {id: 46, label: "Virginia"}, {id: 47, label: "Washington"}, {id: 48, label: "West Virginia"},
                            {id: 49, label: "Wisconsin"}, {id: 50, label: "Wyoming"}  
                         ];
    $scope.incomeBracketList = [ {id: 1, label: "0 - 30,000"}, {id: 2, label: "30,000 - 60,000"}, {id: 3, label: "60,000+"}];
    $scope.genderList = [ {id: 1, label: "Female"}, {id: 2, label: "Male"},];
    $scope.dropDownSettings = { checkBoxes: true, scrollableHeight: '200px', scrollable: true, selectedToTop: true, idProperty: 'id' };
  
  
  // Adds a new recommendation to the recommendation list currently in the database
  $scope.addNewRecommendation = function() {
    var dataObj = {
      name: $scope.newName,
      description: $scope.newDescription,
      websites: $scope.newRecWebsites,
      cost: $scope.newCost,
      imageURL: $scope.newImageURL,
      type: parseInt($scope.newType),
      applicableAges: getIntArrayFromDropDown($scope.selectedAges),
      applicableRoomTypes: getIntArrayFromDropDown($scope.selectedRoomTypes),
      applicableIncomes: getIntArrayFromDropDown($scope.selectedIncomeBrackets),
      applicableGenders: getIntArrayFromDropDown($scope.selectedGenders),
      applicableLocations: getIntArrayFromDropDown($scope.selectedStates)
    };
    var res = $http.post(serverURL + 'api/Recommendations', dataObj);
    res.then(function(data, status, headers, config) {
      alert("New tip added to the database.");
      $window.location.reload();
    }, function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
  };
  
  // Updates the selected recommendation based on the information currently
  // residing in the form at the time of submission

  $scope.updateRecommendation = function() {
    var dataObj = {
      name: $scope.updatedName,
      description: $scope.updatedDescription,
      type: parseInt($scope.updatedType),
      cost: parseInt($scope.updatedCost),
      imageURL: $scope.updatedImageURL,
      applicableAges: getIntArrayFromDropDown($scope.updatedSelectedAges),
      applicableRoomTypes: getIntArrayFromDropDown($scope.updatedSelectedRoomTypes),
      applicableIncomes: getIntArrayFromDropDown($scope.updatedSelectedIncomeBrackets),
      applicableGenders: getIntArrayFromDropDown($scope.updatedSelectedGenders),
      applicableLocations: getIntArrayFromDropDown($scope.updatedSelectedStates),
      websites: $scope.updatedRecWebsites,
      id: recommendation.id
    };
    var res = $http.put(serverURL + 'api/Recommendations/' + dataObj.id, dataObj);
    res.then(function(data, status, headers, config) {
      alert("Recommendation updated in the database.");
      $window.location.reload();
    }, function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
  };
  
  // Closes the modal without submitting the form
  $scope.closeModal = function(){
    $modalInstance.close();
  };

  $scope.populateForm = function() {
  
    $scope.updatedRecWebsites = new Array(2);
    $scope.updatedName = recommendation.name;
    $scope.updatedDescription = recommendation.description;
    $scope.updatedRecWebsites = recommendation.websites;
    $scope.updatedType = recommendation.type;
    $scope.updatedCost = recommendation.cost;
    $scope.updatedImageURL = recommendation.imageURL;
    $scope.updatedSelectedStates = [];
    $scope.updatedSelectedIncomeBrackets = [];
    $scope.updatedSelectedGenders = [];
    $scope.updatedSelectedAges = [];
    $scope.updatedSelectedRoomTypes = [];
  
    // arrays as stored inside the database
    var tempList1 = recommendation.applicableLocations;
    var tempList2 = recommendation.applicableIncomes;
    var tempList3 = recommendation.applicableGenders;
    var tempList4 = recommendation.applicableAges;
    var tempList5 = recommendation.applicableRoomTypes;
  
    // database arrays are formatted to the dropdown menu format
    $scope.updatedSelectedGenders = getDropDownArrayFromList($scope.genderList, tempList3);
    $scope.updatedSelectedIncomeBrackets = getDropDownArrayFromList($scope.incomeBracketList, tempList2);
    $scope.updatedSelectedStates = getDropDownArrayFromList($scope.stateList, tempList1);
    $scope.updatedSelectedAges = getDropDownArrayFromList($scope.ageList, tempList4);
    $scope.updatedSelectedRoomTypes = getDropDownArrayFromList($scope.roomTypeList, tempList5);
  };
});
 
// Used  to convert the selected array from the format that fits
// dropdown list to the format that is inside the database.
function getIntArrayFromDropDown(selectedArray){
  var tempArray = [];
  selectedArray.forEach(function(item){
    tempArray.push(item.id);
  });
  return tempArray;
}

// Used to convert the tip.gender field to a format that the dropdown
// can use to populate and have the correct pre-selected values
function getDropDownArrayFromList(list, selecteditems){
  var tempArray = [];
  selecteditems.forEach(function(item){
    list.forEach(function(item2){
      if (item == item2.id) {
        tempArray.push(item2);
      }
    });
  });
  return tempArray;
}