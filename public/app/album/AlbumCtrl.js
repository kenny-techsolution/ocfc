angular.module('app').controller('AlbumCtrl', function ($scope,$http) {
	$scope.files = [];
	$scope.imageArray = [];
	$scope.imageObjs = [];
	$scope.cloudinarySignedParams;

	$scope.createAlbum=function($files){
		console.log('front-end $scope.createAlbum has been called')

		$http.get("/cloudinarySigned?type=fullSizeImg").success(function (data) {
			$scope.cloudinarySignedParams = data;
		});

		var file = $files;
		console.log('chk file obj');
		console.log(file);

		$scope.$watch('file',function(newVal,oldVal){
			if(newVal){
				for (var i = 0; i < file.length; i++) {
					$scope.files.push(file[i]);
				}
			}
		});


		//must create an album first
		//app.post('/api/albums', albums.createAlbum);
//		var album=new AlbumApiSvc({name:$scope.name,
//			description:$scope.description});
//
//		album.save(function(){
//			console.log('chk album obj');
//			console.log(album);
//		});






	};






});