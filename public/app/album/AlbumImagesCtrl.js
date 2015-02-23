angular.module('app').controller('AlbumImagesCtrl', function ($scope, ImageApiSvc, $location, AlbumDataSvc, FellowshipDataSvc, $routeParams, CloudinaryDataSvc, AlbumsApiSvc) {
	//console.log('front-end AlbumImagesCtrl has been called');
	//Query images
	//UI:  app.get('/api/albums/:album_id/images', albums.queryImages);
	//Route: app.get('/api/albums/:album_id/images', albums.queryImages);
	$scope.files = [];
	$scope.imageArray = [];
	$scope.imageObjs = [];

	$scope.FellowshipDataSvc = FellowshipDataSvc;
	$scope.FellowshipDataSvc.initialize($routeParams.id);
	$scope.CloudinaryDataSvc = CloudinaryDataSvc;
	$scope.CloudinaryDataSvc.cloudinary();

	$scope.FellowshipDataSvc.albums;

	$scope.AlbumDataSvc = AlbumDataSvc;
	$scope.AlbumDataSvc.initializeAlbum($routeParams.album_id);
	$scope.selectedAlbum=false;

	$scope.goto = function (subpage) {
		$location.path('/fellowship/' + $routeParams.id + '/' + subpage);
	};

	$scope.updateAlbum = function () {
		console.log('front-end updateAlbum has been called')
		//Route:  app.get('/api/albums/:id', albums.getAlbum);

		//update certain fields
		var album = new AlbumsApiSvc();
		album.name = AlbumDataSvc.album.album.name;
		album.description = AlbumDataSvc.album.album.description;
		album.location = AlbumDataSvc.album.album.location;

		console.log('chk album obj');
		console.log(album);

		AlbumsApiSvc.update(
			{album_id: $routeParams.album_id}
			, album, function () {
				console.log('front-end updateAlbum from AlbumImagesCtrl has completed');
			}
		);

	}

	$scope.removeImage = function (image) {
		console.log('front-end removeImage has been called')
		console.log('chk image parameter');
		console.log(image);
		console.log('chk $routeParams.album_id');
		console.log($routeParams.album_id);

		var imageObj = ImageApiSvc.get({album_id: $routeParams.album_id,
			image_id: image._id}, function () {
			console.log('chk variable imageObj');
			console.log(imageObj);

			imageObj.$delete({album_id: $routeParams.album_id,
				image_id: image._id}, function () {
				console.log(image._id + ' image ID has been deleted');

				//refresh images on UI
				$scope.AlbumDataSvc.initializeAlbum($routeParams.album_id);

			});
		});
	};

	$scope.deleteAlbum = function () {

		console.log('front-end deleteAlbum has been called')
		//app.delete('/api/albums/:id', albums.deleteAlbum);

		var album = AlbumsApiSvc.get({album_id: $routeParams.album_id}, function () {
			console.log('chk variable obj album');
			console.log(album);

			album.$delete({album_id: $routeParams.album_id}, function () {
				console.log(album + ' album has been deleted');

				$scope.selectedAlbum=true;


			});
		})

	};

});


