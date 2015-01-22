/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').service('FellowshipDataSvc', function(FellowshipUserSvc,FellowshipSvc,IdentitySvc) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id
	this.users=[];
	this.fellowship={};
	this.isAdmin=false;
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
			for (var i = 0; i < IdentitySvc.currentUser.fellowships.length; i++) {
				console.log('chk IdentitySvc.currentUser.fellowships[i].fellowshipId');
				console.log(IdentitySvc.currentUser.fellowships[i].fellowshipId);

				console.log('chk that.fellowship._id');
				console.log(that.fellowship._id);

				console.log('chk IdentitySvc.currentUser.fellowships[i].role');
				console.log(IdentitySvc.currentUser.fellowships[i].role);

				if (IdentitySvc.currentUser.fellowships[i].fellowshipId === that.fellowship._id && IdentitySvc.currentUser.fellowships[i].role === 'admin') {
					that.isAdmin =true;
					console.log('chk that.isAdmin');
					console.log(that.isAdmin);
				} else {
					that.isAdmin =false;
					console.log('chk that.isAdmin');
					console.log(that.isAdmin);
				}
			}
		});

	};
});