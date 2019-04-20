'use strict';
var uniq = require('lodash.uniq');//unique eleemnts in array
var union = require('lodash.union');

module.exports = function(House) {

  House.remoteMethod('getRecommendations',{
    accepts: [{arg: 'id', type: 'number', required: true},
    {arg: 'roomType', type: 'number'}],
    http: {path: '/:id/getRecommendations/:roomType', verb: 'get'},
    returns: { type: ['object'], root: true }
  });

  House.observe('before save',async function(ctx) {
    var houseInstance = ctx.instance;
    //get the residents list for this house
    var residents = houseInstance.residents;
    console.log(residents);
    houseInstance.numResident = residents.length;
    return;
  });


  House.getRecommendations = function(houseId, roomType,cb) {
    //https://loopback.io/doc/en/lb3/Querying-data.html
    var app = House.app;

    House.findById(houseId,{include: {relation: 'residents'}}, function(err, house){
      if (err == null && house != null) {
      
        const categories = House.getFilterableCategories(house);
        var Recommendation = app.models.Recommendation;
        console.log(categories);
  
        Recommendation.find(function(err,recs){
          var filtered = recs.filter(rec => {
            return rec.applicableRoomTypes.includes(roomType);
          })
          console.log(categories);
          if (categories == null) {
            console.log("empty house");
            cb(null,filtered);
          }else{
            filtered = filtered.filter(rec => {
              const intersection = categories.incomes.filter(income=>rec.applicableIncomes.includes(income));
              return intersection.length > 0;
            })
  
            filtered = filtered.filter(rec => {
              const intersection = categories.ages.filter(age=>rec.applicableAges.includes(age));
              return intersection.length > 0;
            })
  
            filtered = filtered.filter(rec => {
              const intersection = categories.genders.filter(gender=>rec.applicableGenders.includes(gender));
              return intersection.length > 0;
            })
            filtered = filtered.filter(rec => {
              const intersection = categories.locations.filter(state=>rec.applicableLocations.includes(state));
              return intersection.length > 0;
            })
            filtered = filtered.filter(rec => {
              const intersection = categories.concerns.filter(concern=>rec.applicableConcerns.includes(concern));
              return intersection.length > 0;
            })
            cb(null,filtered);
          }
        });
      }else{
        console.log(err);
        cb(err,[]);
      }
    });

  }


  //go through all residents of the house and
  House.getFilterableCategories = function(house) {
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
    let residents =  house.toJSON().residents;
    if (residents.length == 0){
      return null;
    }
    residents.forEach(function(resident){
      categories.incomes.push(resident.income);
      categories.ages.push(resident.age);
      categories.genders.push(resident.gender);
      categories.locations.push(resident.location);
      categories.concerns =  union(resident.concerns, categories.concerns);
    });
    categories.incomes = uniq(categories.incomes);
    categories.ages = uniq(categories.ages);
    categories.genders = uniq(categories.genders);
    categories.locations = uniq(categories.locations);
    categories.concerns = uniq(categories.concerns);

    return categories;

  }


};
