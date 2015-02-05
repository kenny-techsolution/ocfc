angular.module('app').controller('AlbumsCtrl', function ($scope,$http,AlbumsApiSvc,ImageApiSvc,FellowshipDataSvc) {
	$scope.files = [];
	$scope.imageArray=[];
	$scope.imageObjs = [];
	$scope.cloudinarySignedParams;
	$scope.clickedPost=true;

	$scope.albumObj={
		name: '',
		description: '',
		location:''
	}

	$http.get("/cloudinarySigned?type=fullSizeImg").success(function (data) {
		$scope.cloudinarySignedParams = data;
	});

	$scope.openAlbum=function($files){
		console.log('front-end $scope.openAlbum has been called')
		var file = $files;
		for (var i = 0; i < file.length; i++) {
			$scope.files.push(file[i]);
		}

	};

	$scope.createAlbum=function(){
		console.log('front-end $scope.createAlbum has been called')

		console.log('chk $scope.imageArray');
		console.log($scope.imageArray);

		//app.post('/api/albums', albums.createAlbum);
		var album=new AlbumsApiSvc({name:$scope.albumObj.name,
								   description:$scope.albumObj.description,
								   location:$scope.albumObj.location,
								   fellowshipId:FellowshipDataSvc.fellowship._id});
		console.log('chk album');
		console.log(album);
		album.$save(function(){
			console.log('chk album obj');
			console.log(album);

			//create image
			//app.post('/api/albums/:album_id/images', albums.createImage);
			for(var i=0;i<$scope.imageArray.length;i++){

				var image=new ImageApiSvc({path:$scope.imageArray[i].public_id,
					caption:$scope.imageArray[i].caption,
					album_id: album._id
				});

				image.$save(function(){
					console.log('chk image obj saved to server');
					console.log(image);
					$scope.clickedPost=false;

				});


			}

		});

	};

	$scope.cancelAlbumUpload=function(){
		$scope.clickedPost=false;
	};




});