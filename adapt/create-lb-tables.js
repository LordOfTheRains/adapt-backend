var server = require('./server/server');
var ds = server.dataSources.adaptDB;//change the last part to whatever datasource connector name you are using

//turn this true if you want docker restart to remove the database schema and refill it with dummy data
const shoudlResetDatabase = false;
const shouldCreateDummyData = false;

if (shoudlResetDatabase) {
  var app = server;
  var Room = app.models.Room;
  var House = app.models.House;
  var Resident = app.models.Resident;
  
  var lbTables = ['AccessToken', 'ACL','RoleMapping', 'Role',
  'User', 'House', 'Room',"Resident", "Recommendation", "Tip"];
  
  //https://loopback.io/doc/en/lb3/Implementing-auto-migration.html
  //automigrate recreates the whole database.
  //autoupdte detects differences.
  
  ds.automigrate().then(function(er) {
    console.log('Loopback tables [' - lbTables - '] migrate completed for', ds.adapter.name);
    if (er) throw er;
    console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
    if (!shouldCreateDummyData) {
      return;
    }
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
          ds.disconnect();
        })
      });
    });
  });
}else{
  console.log("not changing database...");
  process.exit(-1);
}
