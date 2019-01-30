var server = require('./server');
var ds = server.dataSources.mysqlD;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role','Residents', 'Recommendations', 'Tips', 'Houses', 'PhysicalConcerns', 'Rooms','SavedHouseTips','SavedHouseRecommendations','ResidentConcerns','ResidentHouses'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});
