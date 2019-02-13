'use strict';

module.exports = function(Room) {

  Room.remoteMethod('getRecommendations',{
    accepts: [{arg: 'id', type: 'number', required: true}],
    http: {path: '/:id/getRecommendations', verb: 'get'},
    returns: { type: ['object'], root: true }
  });

  Room.getRecommendations = function(roomId, cb) {
    //https://loopback.io/doc/en/lb3/Querying-data.html
    var app = Room.app;
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
    var filtered = require('loopback-filters')(recommendations.get(), filter);
    console.log(filtered); // => [{n: 3}]
    cb(null, filtered)
  }



};
