// Defines the functions and variables (excluding $rootScope) that
// both the newRecommendationForm and updateRecommendationForm have available to them.

app.controller('recommendationFormCtrl', function($scope, $http, $route, $modalInstance, recommendation) {
  const serverURL = "http://142.93.198.244:8080/";
  $scope.newRecWebsites = new Array(2);
  $scope.selectedStates = []; 
  $scope.selectedIncomeBrackets = [];
  $scope.selectedGenders = [];
  $scope.selectedRoomTypes = [];
  $scope.selectedAges = [];
  $scope.selectedType = [];
  $scope.selectedConcerns = [];
  $scope.selectedCost = [];

  $scope.costsList = [{id: 1, label: "Low"}, {id: 2, label: "Medium"}, {id: 3, label: "High"}];
  $scope.roomTypeList = [{id: 1, label: "Outside The Home"}, {id: 2, label: "Entrance"}, 
                          {id: 3, label: "Travel Space"}, {id: 4, label: "Kitchen"}, {id: 5, label: "Restroom"}, {id: 6, label: "Bedroom"}, 
                          {id: 7, label: "Storage"}, {id: 8, label: "Laundry"}, {id: 9, label: "General"}];
  $scope.concernList = [{id: 1, label: "Wheelchair"}, {id: 2, label: "Blindness"}, {id: 3, label: "Speech Impairment"},{id: 4, label: "Deaf"} ];
  $scope.ageList = [{id: 1, label: "40-45"}, {id: 2, label: "45-50"}, {id: 3, label: "50-60"}, {id: 4, label: "60+"}];
  $scope.typeList = [{id: 1, label: "Safety"}, {id: 2, label: "Mobility"}, {id: 3, label: "Visibility"}];
  $scope.stateList = [
    {id: 1, label: "AL"},{id: 2, label: "AK"},{id: 3, label: 'AS'},{id: 4, label: 'AZ'},
    {id: 5, label: 'AR'},{id: 6, label: 'CA'},{id: 7, label: 'CO'},{id: 8, label: 'CT'},
    {id: 9, label: 'DE'},{id: 10, label: 'DC'},{id: 11, label: 'FM'},{id: 12, label: 'FL'},
    {id: 13, label: 'GA'},{id: 14, label: 'GU'},{id: 15, label: 'HI'},{id: 16, label: 'ID'},
    {id: 17, label: 'IL'},{id: 18, label: 'IN'},{id: 19, label: 'IA'},{id: 20, label: 'KS'},
    {id: 21, label: 'KY'},{id: 22, label: 'LA'},{id: 23, label: 'ME'},{id: 24, label: 'MH'},
    {id: 25, label: 'MD'},{id: 26, label: 'MA'},{id: 27, label: 'MI'},{id: 28, label: 'MN'},
    {id: 29, label: 'MS'},{id: 30, label: 'MO'},{id: 31, label: 'MT'},{id: 32, label: 'NE'},
    {id: 33, label: 'NV'},{id: 34, label: 'NH'},{id: 35, label: 'NJ'},{id: 36, label: 'NM'},
    {id: 37, label: 'NY'},{id: 38, label: 'NC'},{id: 39, label: 'ND'},{id: 40, label: 'MP'},
    {id: 41, label: 'OH'},{id: 42, label: 'OK'},{id: 43, label: 'OR'},{id: 44, label: 'PW'},
    {id: 45, label: 'PA'},{id: 46, label: 'PR'},{id: 47, label: 'RI'},{id: 48, label: 'SC'},
    {id: 49, label: 'SD'},{id: 50, label: 'TN'},{id: 51, label: 'TX'},{id: 52, label: 'UT'},
    {id: 53, label: 'VT'},{id: 54, label: 'VI'},{id: 55, label: 'VA'},{id: 56, label: 'WA'},
    {id: 57, label: 'WV'},{id: 58, label: 'WI'},{id: 59, label: 'WY'}
   ];
    $scope.incomeBracketList = [ {id: 1, label: "0 - 30,000"}, {id: 2, label: "30,000 - 60,000"}, {id: 3, label: "60,000+"}];
    $scope.genderList = [ {id: 1, label: "Male"}, {id: 2, label: "Female"},{id: 2, label: "Other"}];
    $scope.dropDownSettings = { checkBoxes: true, scrollableHeight: '200px', scrollable: true, selectedToTop: true, idProperty: 'id' };
    $scope.singleSelectDropDown = { checkBoxes: true, scrollableHeight: '200px', scrollable: true, selectedToTop: true, idProperty: 'id', selectionLimit: 1 };
  
  
  // Adds a new recommendation to the recommendation list currently in the database
  $scope.addNewRecommendation = function() {
     var file = $scope.myFile;
     var uploadUrl = serverURL + "api/images/storage/upload";

     var fd = new FormData();
     fd.append('file', file);
     var res = $http.post(uploadUrl, fd, {
         transformRequest: angular.identity,
         headers: {'Content-Type': undefined}
     });
     res.then(function(data, status, headers, config) {
      var recommendationImageURL = serverURL + "api/images/storage/download/" + file.name;

      var dataObj = {
        name: $scope.newName,
        description: $scope.newDescription,
        websites: $scope.newRecWebsites,
        cost: getIntFromDropDown($scope.selectedCost[0]),
        imageURL: recommendationImageURL,
        type: getIntFromDropDown($scope.selectedType[0]),
        applicableAges: getIntArrayFromDropDown($scope.selectedAges),
        applicableRoomTypes: getIntArrayFromDropDown($scope.selectedRoomTypes),
        applicableIncomes: getIntArrayFromDropDown($scope.selectedIncomeBrackets),
        applicableGenders: getIntArrayFromDropDown($scope.selectedGenders),
        applicableLocations: getIntArrayFromDropDown($scope.selectedStates),
        applicableConcerns: getIntArrayFromDropDown($scope.selectedConcerns)
      };

      var res = $http.post(serverURL + 'api/Recommendations', dataObj);
      res.then(function(data, status, headers, config) {
        alert("New recommendation added to the database.");
        $scope.closeModal();
        $route.reload();
      }, function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}));
      });
    }, function(data, status, headers, config) {
      alert("Image upload failed");
    });
  };
  
  // Updates the selected recommendation based on the information currently
  // residing in the form at the time of submission

  $scope.updateRecommendation = function() {
    if ($scope.newImage == 'yes') {
      var file = $scope.updatedMyFile;
      var uploadUrl = serverURL + "api/images/storage/upload";

      var fd = new FormData();
      fd.append('file', file);
      var res = $http.post(uploadUrl, fd, {
         transformRequest: angular.identity,
         headers: {'Content-Type': undefined}
      });
      res.then(function(data, status, headers, config) {
      var recommendationImageURL = serverURL + "api/images/storage/download/" + file.name;

      var dataObj = {
        name: $scope.updatedName,
        description: $scope.updatedDescription,
        type: getIntFromDropDown($scope.updatedSelectedType[0]),
        cost: getIntFromDropDown($scope.updatedSelectedCost[0]),
        imageURL: recommendationImageURL,
        applicableAges: getIntArrayFromDropDown($scope.updatedSelectedAges),
        applicableRoomTypes: getIntArrayFromDropDown($scope.updatedSelectedRoomTypes),
        applicableIncomes: getIntArrayFromDropDown($scope.updatedSelectedIncomeBrackets),
        applicableGenders: getIntArrayFromDropDown($scope.updatedSelectedGenders),
        applicableLocations: getIntArrayFromDropDown($scope.updatedSelectedStates),
        applicableConcerns: getIntArrayFromDropDown($scope.updatedSelectedConcerns),
        websites: $scope.updatedRecWebsites,
        id: recommendation.id
      };

      var res = $http.put(serverURL + 'api/Recommendations/' + dataObj.id, dataObj);
      res.then(function(data, status, headers, config) {
        alert("Image and recommendation updated in the database.");
        $scope.closeModal();
        $route.reload();
      }, function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}));
      });
      }, function(data, status, headers, config) {
        alert("Image upload failed");
      });
    }
    else {
      var dataObj = {
        name: $scope.updatedName,
        description: $scope.updatedDescription,
        type: getIntFromDropDown($scope.updatedSelectedType[0]),
        cost: getIntFromDropDown($scope.updatedSelectedCost[0]),
        imageURL: $scope.updatedImageURL,
        applicableAges: getIntArrayFromDropDown($scope.updatedSelectedAges),
        applicableRoomTypes: getIntArrayFromDropDown($scope.updatedSelectedRoomTypes),
        applicableIncomes: getIntArrayFromDropDown($scope.updatedSelectedIncomeBrackets),
        applicableGenders: getIntArrayFromDropDown($scope.updatedSelectedGenders),
        applicableLocations: getIntArrayFromDropDown($scope.updatedSelectedStates),
        applicableConcerns: getIntArrayFromDropDown($scope.updatedSelectedConcerns),
        websites: $scope.updatedRecWebsites,
        id: recommendation.id
      };
      var res = $http.put(serverURL + 'api/Recommendations/' + dataObj.id, dataObj);
      res.then(function(data, status, headers, config) {
        alert("Recommendation updated in the database.");
        $scope.closeModal();
        $route.reload();
      }, function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}));
      });
    }
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
    $scope.updatedImageURL = recommendation.imageURL;
    $scope.updatedImage = recommendation.imageURL.substring(recommendation.imageURL.lastIndexOf('/') + 1);
    $scope.updatedSelectedStates = [];
    $scope.updatedSelectedIncomeBrackets = [];
    $scope.updatedSelectedGenders = [];
    $scope.updatedSelectedAges = [];
    $scope.updatedSelectedRoomTypes = [];
    $scope.updatedSelectedType = [];
    $scope.updatedSelectedConcerns = [];
    $scope.updatedSelectedCost = [];

    // arrays as stored inside the database
    var tempList1 = recommendation.applicableLocations;
    var tempList2 = recommendation.applicableIncomes;
    var tempList3 = recommendation.applicableGenders;
    var tempList4 = recommendation.applicableAges;
    var tempList5 = recommendation.applicableRoomTypes;
    var tempList6 = recommendation.applicableConcerns;
  
    // database arrays are formatted to the dropdown menu format
    $scope.updatedSelectedCost = getInt($scope.costsList, recommendation.cost);
    $scope.updatedSelectedType = getInt($scope.typeList, recommendation.type);
    $scope.updatedSelectedGenders = getDropDownArrayFromList($scope.genderList, tempList3);
    $scope.updatedSelectedIncomeBrackets = getDropDownArrayFromList($scope.incomeBracketList, tempList2);
    $scope.updatedSelectedStates = getDropDownArrayFromList($scope.stateList, tempList1);
    $scope.updatedSelectedAges = getDropDownArrayFromList($scope.ageList, tempList4);
    $scope.updatedSelectedRoomTypes = getDropDownArrayFromList($scope.roomTypeList, tempList5);
    $scope.updatedSelectedConcerns = getDropDownArrayFromList($scope.concernList, tempList6);
  };
});
 
// Used  to convert the selected array from the format that fits
// dropdown list to the format that is inside the database.
function getIntArrayFromDropDown(selectedArray){
  var tempArray = [];
  selectedArray.forEach(function(item){
    var temp = (item.id - 1);
    tempArray.push(temp);
  });
  return tempArray;
}

// Used to convert the tip.gender field to a format that the dropdown
// can use to populate and have the correct pre-selected values
function getDropDownArrayFromList(list, selecteditems){
  var tempArray = [];
  selecteditems.forEach(function(item){
    var temp = (item + 1);
    list.forEach(function(item2){
      if (temp == item2.id) {
        tempArray.push(item2);
      }
    });
  });
  return tempArray;
}

function getIntFromDropDown(selectedItem) {
  return selectedItem.id - 1;
}

function getInt(list, selectedValue) {
  var tempArray = [];
  list.forEach(function(item){
    if (item.id == (selectedValue + 1)) {
      tempArray.push(item);
    }
  });
  return tempArray;
}