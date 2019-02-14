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
    var app = Room.app;
    return Room.findById(roomId,[{include: {relation: 'house'}}], function(err, room){
        console.log(roomId);
        if (err == null && room != null) {
          var r = room.toJSON();
          var categories = app.models.House.getFilterableCategories(r.house);
          var genders = [0,1]//this can be retrieved from roomID
          var roomTypes = [0,1,2]//this can be retrieved from roomID
          var recommendations = app.models.Recommendation;
          let filter={
                        where: {
                          and:[
                            {applicableRoomTypes: roomTypes},
                            {applicableGenders: genders}
                          ]
                        }
                    }
          return recommendations.find(function(err,recs){
            var filtered = LBFilter(recs, filter);
            return filtered;
          });

        }else{
          console.log(err);
        }
    });

  }



};
