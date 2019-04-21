// Defines the functions and variables (excluding $rootScope) that
// both the newTipForm and updateTipForm have available to them.

app.controller('tipFormCtrl', function($scope, $http, $modalInstance, $route, tip) {
  const serverURL = "http://165.227.3.148:8080/";
  $scope.newTipWebsites = [];
  $scope.selectedType = [];
  $scope.selectedSubtype = [];
  $scope.selectedStates = [];
  $scope.selectedIncomeBrackets = [];
  $scope.selectedGenders = [];
  $scope.tipTypeList = [{id: 1, label: "Financial"}, {id: 2, label: "State/Federal Programs"}, {id: 3, label: "Building Professionals"}, {id: 4, label: "Product"}, {id: 5, label: "Videos"}, {id: 6, label: "Technology"}];
  $scope.tipSubtypeList = [{id: 1, label: "Contractor"}, {id: 2, label: "Builder"}, {id: 3, label: "Technician"}, {id: 4, label: "Designer"}, {id: 5, label: "Become A Certified Consultant"}];
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
  $scope.singleSelectDropDown = { checkBoxes: true, scrollableHeight: '200px', scrollable: true, selectedToTop: true, idProperty: 'id', selectionLimit: 1};


  // Adds a new tip to the tip list currently in the database
  $scope.addNewTip = function() {
    if ($scope.selectedType[0].id == 3){
      var dataObj = {
        name: $scope.newTip.name,
        description: $scope.newTip.description,
        websites: $scope.newTipWebsites,
        type: getIntFromDropDown($scope.selectedType[0]),
        subtype: getStringFromDropDown($scope.selectedSubtype[0]),
        minAge: parseInt($scope.newTip.minAge),
        maxAge: parseInt($scope.newTip.maxAge),
        applicableIncomes: getIntArrayFromDropDown($scope.selectedIncomeBrackets),
        applicableGenders: getIntArrayFromDropDown($scope.selectedGenders),
        applicableLocations: getIntArrayFromDropDown($scope.selectedStates)
      };
    }
    else { 
      var dataObj = {
        name: $scope.newTip.name,
        description: $scope.newTip.description,
        websites: $scope.newTipWebsites,
        type: getIntFromDropDown($scope.selectedType[0]),
        subtype: null,
        minAge: parseInt($scope.newTip.minAge),
        maxAge: parseInt($scope.newTip.maxAge),
        applicableIncomes: getIntArrayFromDropDown($scope.selectedIncomeBrackets),
        applicableGenders: getIntArrayFromDropDown($scope.selectedGenders),
        applicableLocations: getIntArrayFromDropDown($scope.selectedStates)
      };
    }
    var res = $http.post(serverURL + 'api/Tips', dataObj);
      res.then(function(data, status, headers, config) {
        alert("New tip added to the database.");
        $scope.closeModal();
        $route.reload();
      }, function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}));
      });
  };

  // Updates the selected tip based on the information currently
  // residing in the form at the time of submission
  $scope.updateTip = function() {
    if($scope.updatedSelectedType[0].id  == 3){
      var dataObj = {
        name: $scope.updatedName,
        description: $scope.updatedDescription,
        websites: $scope.updatedTipWebsites,
        type: getIntFromDropDown($scope.updatedSelectedType[0]),
        subtype: getStringFromDropDown($scope.updatedSelectedSubtype[0]),
        minAge: parseInt($scope.updatedMinAge),
        maxAge: parseInt($scope.updatedMaxAge),
        applicableIncomes: getIntArrayFromDropDown($scope.updatedSelectedIncomeBrackets),
        applicableGenders: getIntArrayFromDropDown($scope.updatedSelectedGenders),
        applicableLocations: getIntArrayFromDropDown($scope.updatedSelectedStates),
        id: tip.id
      };
    }
    else{
      var dataObj = {
        name: $scope.updatedName,
        description: $scope.updatedDescription,
        websites: $scope.updatedTipWebsites,
        type: getIntFromDropDown($scope.updatedSelectedType[0]),
        subtype: null,
        minAge: parseInt($scope.updatedMinAge),
        maxAge: parseInt($scope.updatedMaxAge),
        applicableIncomes: getIntArrayFromDropDown($scope.updatedSelectedIncomeBrackets),
        applicableGenders: getIntArrayFromDropDown($scope.updatedSelectedGenders),
        applicableLocations: getIntArrayFromDropDown($scope.updatedSelectedStates),
        id: tip.id
      };
    }
    var res = $http.put(serverURL + 'api/Tips/' + dataObj.id, dataObj);
    res.then(function(data, status, headers, config) {
      alert("Tip updated in the database.");
      $scope.closeModal();
      $route.reload();
    }, function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
  };

  // Closes the modal without the form being submittd and 
  $scope.closeModal = function(){
    $modalInstance.close();
  };

  // Used to populate the form upon opening based on the
  // selected tip's info
  $scope.populateForm = function() {

    $scope.updatedTipWebsites = [];
    $scope.updatedName = tip.name;
    $scope.updatedDescription = tip.description;
    $scope.updatedMinAge = tip.minAge;
    $scope.updatedMaxAge = tip.maxAge;
    $scope.updatedTipWebsites = tip.websites;
    $scope.updatedSelectedType = [];
    $scope.updatedSelectedSubtype = [];
    $scope.updatedSelectedStates = [];
    $scope.updatedSelectedIncomeBrackets = [];
    $scope.updatedSelectedGenders = [];

    //arrays as stored inside the database
    var tempList1 = tip.applicableLocations;
    var tempList2 = tip.applicableIncomes;
    var tempList3 = tip.applicableGenders;

    //database arrays are formatted to the dropdown menu format
    $scope.updatedSelectedType = getType($scope.tipTypeList, tip.type);
    $scope.updatedSelectedSubtype = getSubtype($scope.tipSubtypeList, tip.subtype);
    $scope.updatedSelectedGenders = getDropDownArrayFromList($scope.genderList, tempList3);
    $scope.updatedSelectedIncomeBrackets = getDropDownArrayFromList($scope.incomeBracketList, tempList2);
    $scope.updatedSelectedStates = getDropDownArrayFromList($scope.stateList, tempList1);
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
  return (selectedItem.id - 1);
}

function getStringFromDropDown(selectedItem) {
  return selectedItem.label;
}

function getType(list, selectedValue) {
  var tempArray = [];
  var temp = (selectedValue + 1);
  list.forEach(function(item){
    if (item.id == temp) {
      tempArray.push(item);
    }
  });
  return tempArray;
}

function getSubtype(list, selectedValue) {
  var tempArray = [];
  list.forEach(function(item){
    if (item.label == selectedValue) {
      tempArray.push(item);
    }
  });
  return tempArray;
}