/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').service('ChurchDataSvc', function(ChurchUserApiSvc) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id
	this.users=[];
	var that=this;
	this.initialize=function(churchId){
		//
		that.users = ChurchUserApiSvc.getAllMembers(
			{
				church_id:churchId
			}
			, function () {
//				console.log('chk this.users');
//				console.log(that.users);
			}
		);

	};
});