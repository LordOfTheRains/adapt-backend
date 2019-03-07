'use strict';

module.exports = function(resident) {
  resident.disableRemoteMethodByName('createChangeStream', true);	// removes (GET|POST) /products/change-stream
  resident.disableRemoteMethodByName('replaceOrCreate', true);	// removes (GET|POST) /products/change-stream

};
