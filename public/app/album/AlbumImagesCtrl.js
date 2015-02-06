angular.module('app').controller('AlbumImagesCtrl', function ($scope,ImageApiSvc,$routeParams,$location,AlbumDataSvc) {
	console.log('front-end AlbumImagesCtrl has been called');
	//Query images
	//UI:  app.get('/api/albums/:album_id/images', albums.queryImages);
	//Route: app.get('/api/albums/:album_id/images', albums.queryImages);

	$scope.AlbumDataSvc=AlbumDataSvc;
	$scope.AlbumDataSvc.initializeAlbum($routeParams.album_id);

	$scope.goto = function(subpage){
		$location.path('/fellowship/'+ $routeParams.id + '/' + subpage);
	};

	$scope.editAlbum=function(){


	};





});


