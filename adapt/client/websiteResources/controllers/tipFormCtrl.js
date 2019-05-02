// Defines the functions and variables (excluding $rootScope) that
// both the newTipForm and updateTipForm have available to them.


app.controller('tipFormCtrl', function($scope, $http, $modalInstance, $route, tip) {
  const serverURL = "http://142.93.198.244:8080/";
  $scope.buildingProfID = 3;
  $scope.newTipWebsite ="";
  $scope.selectedType = [];
  $scope.selectedSubtype = [];
  $scope.selectedStates = [];
  $scope.selectedIncomeBrackets = [];
  $scope.selectedGenders = [];
  $scope.tipTypeList = [{id: 1, label: "Financial"}, 
                        {id: 2, label: "State/Federal Programs"}, 
                        {id: 3, label: "Building Professionals"},
                        {id: 4, label: "Product"}, 
                        {id: 5, label: "Videos"},
                        {id: 6, label: "Technology"}];
  $scope.tipSubtypeList = [{id: 1, label: "Contractor"}, 
                            {id: 2, label: "Builder"}, 
                            {id: 3, label: "Technician"}, 
                            {id: 4, label: "Designer"}, 
                            {id: 5, label: "Become A Certified Consultant"}];
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
  $scope.incomeBracketList = [ {id: 1, label: "0 - 30,000"}, {id: 2, label: "30,000 - 60,000"}, {id:3, label: "60,000+"}];
  $scope.genderList = [ {id: 1, label: "Male"}, {id: 2, label: "Female"}, {id: 3, label: "Other"}];
  $scope.dropDownSettings = { checkBoxes: true, scrollableHeight: '200px', scrollable: true, selectedToTop: true, idProperty: 'id' };
  $scope.singleSelectDropDown = { checkBoxes: true, scrollableHeight: '200px', scrollable: true, selectedToTop: true, idProperty: 'id', selectionLimit: 1};


  // Adds a new tip to the tip list currently in the database
  $scope.addNewTip = function() {
    var dataObj = {
      name: $scope.newTip.name,
      description: $scope.newTip.description,
      website: $scope.newTipWebsite,
      type: getIntFromDropDown($scope.selectedType[0]),
      subtype: null,
      minAge: parseInt($scope.newTip.minAge),
      maxAge: parseInt($scope.newTip.maxAge),
      applicableIncomes: getIntArrayFromDropDown($scope.selectedIncomeBrackets),
      applicableGenders: getIntArrayFromDropDown($scope.selectedGenders),
      applicableLocations: getIntArrayFromDropDown($scope.selectedStates)
    };
    if ($scope.selectedType[0].id == $scope.buildingProfID){
      dataObj.subtype = getStringFromDropDown($scope.selectedSubtype[0]);
    }
    console.log("newTip:", dataObj);
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
    var dataObj = {
      name: $scope.updatedName,
      description: $scope.updatedDescription,
      website: $scope.updatedTipWebsite,
      type: getIntFromDropDown($scope.updatedSelectedType[0]),
      subtype: null,
      minAge: parseInt($scope.updatedMinAge),
      maxAge: parseInt($scope.updatedMaxAge),
      applicableIncomes: getIntArrayFromDropDown($scope.updatedSelectedIncomeBrackets),
      applicableGenders: getIntArrayFromDropDown($scope.updatedSelectedGenders),
      applicableLocations: getIntArrayFromDropDown($scope.updatedSelectedStates),
      id: tip.id
    };
    if($scope.updatedSelectedType[0].id  == $scope.buildingProfID){
      dataObj.subtype = getStringFromDropDown($scope.updatedSelectedSubtype[0]);
    }
    console.log("new tip:", dataObj);
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
    console.log(tip);
    $scope.updatedTipWebsite = [];
    $scope.updatedName = tip.name;
    $scope.updatedDescription = tip.description;
    $scope.updatedMinAge = tip.minAge;
    $scope.updatedMaxAge = tip.maxAge;
    $scope.updatedTipWebsite = tip.website;

    //database arrays are formatted to the dropdown menu format
    $scope.updatedSelectedType = getType($scope.tipTypeList, tip.type);
    $scope.updatedSelectedSubtype = getSubtype($scope.tipSubtypeList, tip.subtype);
    $scope.updatedSelectedGenders = getDropDownArrayFromList($scope.genderList, tip.applicableGenders);
    $scope.updatedSelectedIncomeBrackets = getDropDownArrayFromList($scope.incomeBracketList, tip.applicableIncomes);
    $scope.updatedSelectedStates = getDropDownArrayFromList($scope.stateList, tip.applicableLocations);
  };
});

// Used  to convert the selected array from the format that fits
// dropdown list to the format that is inside the database.
function getIntArrayFromDropDown(selectedArray){
  var tempArray = [];
  selectedArray.forEach(function(item){
    console.log(item);
    tempArray.push(item.id-1);
  });
  return tempArray;
}

// Used to convert the tip.gender field to a format that the dropdown
// can use to populate and have the correct pre-selected values
function getDropDownArrayFromList(list, selecteditems){
  var tempArray = [];
  selecteditems.forEach(function(item){
    var temp = (item +1 );//+1
    list.forEach(function(item2){
      if (temp == item2.id) {
        tempArray.push(item2);
      }
    });
  });
  return tempArray;
}

function getIntFromDropDown(selectedItem) {
  return (selectedItem.id+1);
}

function getStringFromDropDown(selectedItem) {
  return selectedItem.label;
} 

function getType(list, selectedValue) {
  var tempArray = [];
  var temp = (selectedValue+1);//+1
  list.forEach(function(item){
    if (item.id == temp) {
      tempArray.push(item);
    }
  });
  console.log(selectedValue)
  console.log(tempArray)
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
