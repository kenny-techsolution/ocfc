/*******************************************************************************
 * This file creates a new Controller called FellowUsersSvc creates a resource
 * called fellowUsersResource fellowMemResource: Takes rest /api/fellowUsers/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').factory('FellowshipUserSvc', function ($resource) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id
	var fellowshipUserResource = $resource('/api/fellowships/:fellowship_id/users/:user_id', {
		fellowship_id: '@fellowship_id',
		user_id:'@user_id'
	}, {'getNewFriends':{
			method: 'GET',
			isArray: true,
			params:{numOfMth:1}
		},
		'getAllMembers':{
			method: 'GET',
			isArray: true
		},
		'update': {
			method: 'PUT',
			isArray: false
		},
		'deleteFellowUsers': {
			method: 'DELETE',
			params: {}
		}
	});
	return fellowshipUserResource;
});