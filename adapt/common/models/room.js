'use strict';
const LBFilter = require('loopback-filters');
module.exports = function(Room) {

  Room.remoteMethod('getRecommendations',{
    accepts: [{arg: 'id', type: 'number', required: true}],
    http: {path: '/:id/getRecommendations', verb: 'get'},
    returns: { type: ['object'], root: true }
  });

  Room.getRecommendations = function(roomId, cb) {
    //https://loopback.io/doc/en/lb3/Querying-data.html
    const requestPromise = new Promise((resolve, reject) => {


    });
    var app = Room.app;
    return Room.findById(roomId,{include: {relation: 'house'}}, function(err, room){
        if (err == null && room != null) {
          var thisRoom = room.toJSON();
          app.models.House.getFilterableCategories(thisRoom.houseId, function(err, categories){
            var Recommendation = app.models.Recommendation;
            console.log(categories.genders);


            Recommendation.find(function(err,recs){
              
              cb(null,recs);
            });
          })
        }else{
          console.log(err);
          cb(err,[]);
        }
    });

  }



};
