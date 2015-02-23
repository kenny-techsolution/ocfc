angular.module('app').controller('AlbumsCtrl', function ($scope,$http,$location,AlbumsApiSvc,ImageApiSvc,FellowshipDataSvc,$routeParams,CloudinaryDataSvc) {
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

	$scope.clickedPost=true;
	$scope.fellowshipId=$routeParams.id;


	console.log('chk $scope.albums');
	console.log($scope.albums);


	$scope.albumObj={
		name: '',
		description: '',
		location:''
	}

	$scope.openAlbum=function($files){
		console.log('front-end $scope.openAlbum has been called')
		var file = $files;
		for (var i = 0; i < file.length; i++) {
			$scope.files.push(file[i]);
		}
		//console.log('chk $scope.files');
		//console.log($scope.files);
	};
});