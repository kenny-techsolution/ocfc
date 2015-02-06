angular.module('app').controller('AlbumImagesCtrl', function ($scope,ImageApiSvc,$routeParams,$location) {
	console.log('front-end AlbumImagesCtrl has been called');
	//Query images
	//UI:  app.get('/api/albums/:album_id/images', albums.queryImages);
	//Route: app.get('/api/albums/:album_id/images', albums.queryImages);

	$scope.goto = function(subpage){
		$location.path('/fellowship/'+ $routeParams.id + '/' + subpage);
	};

	var images=ImageApiSvc.query({album_id:$routeParams.album_id},function(){
		$scope.images=images;
		console.log('chk $scope.images');
		console.log($scope.images);
	});


	$scope.editAlbum=function(){


	};





});


