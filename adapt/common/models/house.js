'use strict';
var uniq = require('lodash.uniq');//unique eleemnts in array

module.exports = function(House) {
  House.observe('before save',async function(ctx) {
    var houseInstance = ctx.instance;
    //get the residents list for this house
    var residents = houseInstance.residents;
    console.log(residents);
    houseInstance.numResident = residents.length;
    return;
  });

  //go through all residents of the house and
  House.getFilterableCategories = function(houseID, cb) {
    return House.findById(houseID,{include: {relation: 'residents'}}, function(err, house){

      var categories = {
        "incomes":[],
        "ages":[],
        "genders":[],
        "locations":[],
        "concerns":[]
      }
      if (house == null){
        return categories;
      }
      var incomes = [];
      var ages = [];
      var genders = [];
      var locations = [];
      var concerns = [];
      house.toJSON().residents.forEach(function(resident){
        categories.incomes.push(resident.income);
        categories.ages.push(resident.age);
        categories.genders.push(resident.gender);
        categories.locations.push(resident.location);
      });
      categories.incomes = uniq(categories.incomes);
      categories.ages = uniq(categories.ages);
      categories.genders = uniq(categories.genders);
      categories.locations = uniq(categories.locations);

      cb(null, categories);
    });

  }


};
