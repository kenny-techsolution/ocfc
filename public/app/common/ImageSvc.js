/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').factory('ImageSvc', function ($resource) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id
	var imageResource = $resource('/api/albums/:album_id/images/:image_id', {
		album_id: '@album_id',
		image_id:'@image_id'
	}, {
		'update': {
			method: 'PUT',
			isArray: false
		}
	}
	);

	return imageResource;
});
