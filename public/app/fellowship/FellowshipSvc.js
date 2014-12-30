/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').factory('FellowshipSvc', function ($resource) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id
	var fellowshipResource = $resource('/api/fellowships/:id', {
		_id: '@id'
	}, {
		'update': {
			method: 'PUT',
			isArray: false
		}
	}, {
		'create':{
			method:'POST',
			params:{create:true}
		}
		}
	);

	return fellowshipResource;
});