/*******************************************************************************
 * This file creates a new Controller called FellowUsersSvc creates a resource
 * called fellowUsersResource fellowMemResource: Takes rest /api/fellowUsers/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').factory('ChurchFellowshipSvc', function ($resource) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id
	var churchFellowshipResource = $resource('/api/churches/:church_id/fellowships/:fellowship_id', {
		fellowship_id: '@fellowship_id',
		church_id:'@church_id'
	}, {
		'getAllFellowships':{
			method: 'GET',
			isArray: true
		},
		'update': {
			method: 'PUT',
			isArray: false
		},
		'deleteFellowships': {
			method: 'DELETE',
			params: {}
		}
	});
	return churchFellowshipResource;
});