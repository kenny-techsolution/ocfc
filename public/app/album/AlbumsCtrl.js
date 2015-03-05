angular.module('app').controller('AlbumsCtrl', function ($scope,$http,$location,$upload,AlbumsApiSvc,ImageApiSvc,FellowshipDataSvc,$routeParams,CloudinaryDataSvc) {
	$scope.goto = function(subpage){
		$location.path('/fellowship/'+ $routeParams.id + '/' + subpage);
	};
	$scope.files = [];
	$scope.FellowshipDataSvc=FellowshipDataSvc;
	$scope.FellowshipDataSvc.initialize($routeParams.id);
	//grab albums pertaining to a fellowship
	$scope.FellowshipDataSvc.albums;
	console.log('chk $scope.FellowshipDataSvc.albums');
	console.log($scope.FellowshipDataSvc.albums);
	$scope.CloudinaryDataSvc=CloudinaryDataSvc;
	$scope.CloudinaryDataSvc.cloudinary();
	$scope.imageArray=[];
	$scope.imageObjs = [];
	$scope.clickedPost=false;
	$scope.fellowshipId=$routeParams.id;

	console.log('chk $scope.albums');
	console.log($scope.albums);
	$scope.albumObj={
		name: '',
		description: '',
		location:''
	}
	console.log('chk $scope.clickedPost');
	console.log($scope.clickedPost);

	$scope.addImageToAlbum=function($files){
		console.log('front-end $scope.addImageToAlbum has been called')
		$scope.clickedPost=true;
		var file = $files;
		for (var i = 0; i < file.length; i++) {
			$scope.files.push(file[i]);
		}
		//console.log('chk $scope.files');
		//console.log($scope.files);
		$scope.upload = $upload.upload({
			url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
			data: $scope.CloudinaryDataSvc.cloudinarySignedParams,
			file: $scope.files
		}).progress(function (e) {
			//console.log('progress method is being called');
			$scope.progress = Math.round((e.loaded * 100.0) / e.total);
			if ($scope.progress == 100) {
				//console.log('$scope.progress==100 IF statement has been called');
				setTimeout(function () {
					$scope.progress = 0;
				}, 10000);
			}
			$scope.$apply();
		}).success(function (data, status, headers, config) {
			$scope.path = 'https://res.cloudinary.com/ocfc/image/upload/' + data.public_id;
			$scope.$apply();

			console.log('upload of images in $scope.addImageToAlbum has completed');
			console.log('chk $scope.path');
			console.log($scope.path);

		});
	};
	$scope.createAlbum=function(){};
	$scope.cancelAlbumUpload=function(){
		$scope.clickedPost=false;
	};

});