/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').service('CloudinaryDataSvc', function($http) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id

	this.cloudinarySignedParams=null;
	this.cloudinarySignedAvatar=null;
	var that=this;

	this.cloudinary=function(){
		that.cloudinarySignedParams=$http.get("/cloudinarySigned?type=fullSizeImg").success(function (data) {
			that.cloudinarySignedParams = data;
			console.log('chk that.cloudinarySignedParams');
			console.log(that.cloudinarySignedParams);
		});

		that.cloudinarySignedAvatar=$http.get("/cloudinarySigned?type=avatar").success(function(data){
			that.cloudinarySignedAvatar = data;
			console.log('chk that.cloudinarySignedAvatar');
			console.log(that.cloudinarySignedAvatar);
		});

	};
});