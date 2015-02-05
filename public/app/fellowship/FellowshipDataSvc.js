/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').service('FellowshipDataSvc', function(FellowshipUserApiSvc,FellowshipApiSvc,IdentitySvc) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id
	this.users=[];
	this.fellowship=null;
	this.isAdmin=false;
	var that=this;
	this.initialize=function(fellowId){
//		console.log("this.initialize");
//		console.log(fellowId);
		that.users = FellowshipUserApiSvc.getAllMembers(
			{
				fellowship_id:fellowId
			}
			, function () {
//				console.log('chk this.users');
//				console.log(that.users);
			}
		);
		//grab one fellowship
		that.fellowship=FellowshipApiSvc.get({id:fellowId}, function() {
			for (var i = 0; i < IdentitySvc.currentUser.fellowships.length; i++) {
				if (IdentitySvc.currentUser.fellowships[i].fellowshipId === that.fellowship._id) {
					if(IdentitySvc.currentUser.fellowships[i].role === 'admin') {
						that.isAdmin =true;
						return;
					}
					//console.log('chk that.isAdmin');
					//console.log(that.isAdmin);
				}
				that.isAdmin =false;
			}
		});

	};
});