/*******************************************************************************
 * This file creates a new Controller called FellowMemSvc creates a resource
 * called fellowMemResource fellowMemResource: Takes rest /api/fellowMems/:id
 * using GET method to grab records for specific user
 ******************************************************************************/

// factory, is a singleton, that contains data or function that can be used
// across controllers
angular.module('app').service('AlbumDataSvc', function(ImageApiSvc) {
	// rest api standard, for GET, if id is specified, it will grab specific
	// user by id
	this.albumImages=null;
	var that=this;
	this.initializeAlbum=function(album_id){
		that.albumImages=ImageApiSvc.query({album_id:album_id},function(){
			console.log('chk that.albumImages');
			console.log(that.albumImages);
		});
	};
});