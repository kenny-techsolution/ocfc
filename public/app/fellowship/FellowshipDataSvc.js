/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').service('FellowshipDataSvc', function(FellowshipUserSvc,FellowshipSvc) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id
	this.users=[];
	this.fellowship={};
	var that=this;
	this.initialize=function(fellowId){
//		console.log("this.initialize");
//		console.log(fellowId);
		that.users = FellowshipUserSvc.getAllMembers(
			{
				fellowship_id:fellowId
			}
			, function () {
//				console.log('chk this.users');
//				console.log(that.users);
			}
		);
		//grab one fellowship
		that.fellowship=FellowshipSvc.get({id:fellowId}, function() {
			//console.log('front-end that.fellowship has been called to grab a fellowship obj');
		});


	};
});