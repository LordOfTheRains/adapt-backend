'use strict';

module.exports = function(House) {
  House.observe('before save',async function(ctx) {
    var houseInstance = ctx.instance;
    //get the residents list for this house
    var residents = houseInstance.residents;
    houseInstance.numResident = residents.length;
    return;
  });

  //go through all residents of the house and
  House.getFilterableCategories = function(house) {
    var categories = {
      "incomes":[],
      "ages":[],
      "genders":[],
      "locations":[],
      "concerns":[]
    }
    var incomes = [];
    var ages = [];
    var genders = [];
    var locations = [];
    var concerns = [];
    house.residents.forEach(function(resident){
      categories.incomes.append(resident.income);
      categories.ages.append(resident.age);
      categories.genders.append(resident.gender);
      categories.locations.append(resident.location);
      //concerns.append(resident.income);
    });
    categories.incomes = categories.incomes.unique();
    categories.ages = categories.ages.unique();
    categories.genders = categories.genders.unique();
    categories.locations = categories.locations.unique();
    return categories;

  }


};
