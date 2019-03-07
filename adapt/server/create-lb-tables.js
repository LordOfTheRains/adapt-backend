var server = require('./server');
var ds = server.dataSources.adaptDB;//change the last part to whatever datasource connector name you are using

var app = server;
var Room = app.models.Room;
var House = app.models.House;
var Resident = app.models.Resident;
var Recommendation = app.models.Recommendation;
/*
var lbTables = ['User', 'AccessToken', 'ACL',
  'RoleMapping', 'Role','Residents', 'Recommendation',
  'Tips', 'House', 'PhysicalConcern', 'Rooms','SavedHouseTips',
  'SavedHouseRecommendations','ResidentConcerns','ResidentHouses',
  'ResidentRoomConcerns', 'Website', "RecommendationWebSites",
  'TipsWebsites'];
*/

var lbTables = ['AccessToken', 'ACL','RoleMapping', 'Role',
'User', 'House', 'Room',"Resident", "Recommendation", "Tip"];
ds.automigrate().then(function(er) {
  console.log('Loopback tables [' - lbTables - '] migrate completed for', ds.adapter.name);
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);

  //create sample data
  House.create([
    {
      "name": "h1",
      "numResident": 0,
      "userId": 0
    },
    {
      "name": "h2",
      "numResident": 0,
      "userId": 0
    }
  ], function(err, houses){
    if (er) throw er;
    Room.create([
      {
        "name": "r1",
        "description": "string",
        "type": 0,
        "houseId": 1
      },
      {
        "name": "r2",
        "description": "string",
        "type": 0,
        "houseId": 1
      }
    ], function(err, room){
      if (er) throw er;
      Resident.create([
        {
          "name": "resident 1",
          "age": 0,
          "gender": 0,
          "location": "1",
          "income": 0,
          "userId": 0
        },
        {
          "name": "resident 2",
          "age": 0,
          "gender": 1,
          "location": "1",
          "income": 0,
          "userId": 0
        },
      ],function(err, residents){
        console.log("created");
        if (er) throw er;
        console.log(houses[0]);
        houses[0].residents.add(residents[0].id, function(err){
          Recommendation.create([
            {
              "name": "Recommendation 1",
              "description": "string",
              "isProductRec": false,
              "cost": 0,
              "applicableGenders": [
                1
              ],
              "applicableRoomTypes": [
                0
              ],
              "applicableIncomes": [
                0
              ],
              "applicableAges": [
                0
              ],
              "applicableLocations": [
                0
              ],
              "type": 0,
              "websites": [
                {}
              ]
            },
            {
              "name": "Recommendation 2",
              "description": "string",
              "isProductRec": false,
              "cost": 0,
              "applicableGenders": [
                0
              ],
              "applicableRoomTypes": [
                0
              ],
              "applicableIncomes": [
                0
              ],
              "applicableAges": [
                0
              ],
              "applicableLocations": [
                0
              ],
              "type": 0,
              "websites": [
                {}
              ]
            }
          ], function(err, recs){
            if (er) throw er;
            ds.disconnect();
          })

        })
      })
    });
  });

});
