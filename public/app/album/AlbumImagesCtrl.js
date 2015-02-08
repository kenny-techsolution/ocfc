angular.module('app').controller('AlbumImagesCtrl', function ($scope,ImageApiSvc,$location,AlbumDataSvc,FellowshipDataSvc,$routeParams,CloudinaryDataSvc,AlbumsApiSvc) {
	//console.log('front-end AlbumImagesCtrl has been called');
	//Query images
	//UI:  app.get('/api/albums/:album_id/images', albums.queryImages);
	//Route: app.get('/api/albums/:album_id/images', albums.queryImages);
	$scope.files = [];
	$scope.imageArray=[];
	$scope.imageObjs = [];

	$scope.FellowshipDataSvc=FellowshipDataSvc;
	$scope.FellowshipDataSvc.initialize($routeParams.id);
	$scope.CloudinaryDataSvc=CloudinaryDataSvc;
	$scope.CloudinaryDataSvc.cloudinary();

	$scope.albums=$scope.FellowshipDataSvc.albums;

	$scope.AlbumDataSvc=AlbumDataSvc;
	$scope.AlbumDataSvc.initializeAlbum($routeParams.album_id);



	$scope.goto = function(subpage){
		$location.path('/fellowship/'+ $routeParams.id + '/' + subpage);
	};


	$scope.getAlbum=function() {
		//console.log('front-end $scope.getAlbum has been called')
		//Route:  app.get('/api/albums/:id', albums.getAlbum);
		var files=AlbumsApiSvc.get({album_id:$routeParams.album_id},function(){
			$scope.files=files;

			console.log('chk $scope.files obj');
			console.log($scope.files);


			console.log('chk $scope.AlbumDataSvc.album');
			console.log($scope.AlbumDataSvc.album);
		});


	}



});


