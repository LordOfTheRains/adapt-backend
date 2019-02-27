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
            let filter={
                        "where": {
                          "applicableGenders": {"inq": categories.genders}
                        }
                      }
            console.log(categories.genders);
            // Recommendation.find({"where":
            //   "applicableGenders": {"inq": [0]}}
            // }, function(err, recs){
            //
            //   console.log(recs);
            //   cb(null,recs);
            // })


            Recommendation.find({where: {applicableGenders: {inq: [1]}}}, function(err,recs){
              var filtered = LBFilter(recs, filter);
              console.log(recs);
              console.log(filter);
              console.log(filtered);
              cb(null,filtered);
            });
          })
        }else{
          console.log(err);
          cb(err,[]);
        }
    });

  }



};
