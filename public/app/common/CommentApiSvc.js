/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').factory('CommentApiSvc', function ($resource) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id

	var commentResource = $resource('/api/posts/:post_id/comments/:comment_id', {
		post_id: '@post_id',
		comment_id:'@comment_id'
	}, {
		'update': {
			method: 'PUT',
			isArray: false
		}
	}
	);

	return commentResource;
});