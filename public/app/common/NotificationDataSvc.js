/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').service('NotificationDataSvc', function(IdentitySvc,$http) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id
	this.notifications=[];
	var that=this;

	//refresh method only needs to be called once
	//then you can access variables such as this.notifications
	this.refresh=function(){
//		console.log("this.initialize");
		console.log('chk IdentitySvc.currentUser._id');
		console.log(IdentitySvc.currentUser._id);

		$http.get('/api/notification?recipient=' + IdentitySvc.currentUser._id).success(function (data, status, headers, config) {
			console.log('fire up NotificationDataSvc');
			// this callback will be called asynchronously
			// when the response is available
			that.notifications =data;
			console.log('notification success');
			console.log('chk that.notifications');
			console.log(that.notifications);
		}).error(function (data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log('notification error');
			console.log('chk data');
			console.log(data);
		});
	};
});


