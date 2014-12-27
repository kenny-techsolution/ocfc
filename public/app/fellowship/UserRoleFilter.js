/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').filter('UserRoleFilter', function () {
	// rest api standard, for GET, if id is specified, it will grab specific
	return function(input){
		var output;
		if(input.toLowerCase()==='admin'){
			output='L';
		}else if (input.toLowerCase()==='member'){
			output='M';
		}
		return output;

	};
});