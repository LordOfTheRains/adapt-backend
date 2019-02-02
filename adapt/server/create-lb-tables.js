var server = require('./server');
var ds = server.dataSources.adaptDB;//change the last part to whatever datasource connector name you are using
var lbTables = ['User', 'AccessToken', 'ACL',
  'RoleMapping', 'Role','Residents', 'Recommendations',
  'Tips', 'Houses', 'PhysicalConcerns', 'Rooms','SavedHouseTips',
  'SavedHouseRecommendations','ResidentConcerns','ResidentHouses',
  'ResidentRoomConcerns', 'Website', "RecommendationWebSites",
  'TipsWebsites'];
ds.automigrate(lbTables, function(er) {
  console.log('Loopback tables [' - lbTables - '] migrate completed for', ds.adapter.name);
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});
