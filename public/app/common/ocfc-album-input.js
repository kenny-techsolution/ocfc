angular.module('app').directive('ocfcAlbumInput', function (AlbumsApiSvc,FellowshipDataSvc,$routeParams,ImageApiSvc) {
	return{
		restrict: 'E',
		scope: {
			files:'=',
			imageArray:'=',
			imageObjs:'=',
			cloudinaryParams:'=',
			albums:'='
		},
		replace: true,
		templateUrl: '/partials/common/ocfc-album-input',
		controller: function ($scope) {
			$scope.FellowshipDataSvc=FellowshipDataSvc;
			$scope.FellowshipDataSvc.initialize($routeParams.id);
			$scope.albums=$scope.FellowshipDataSvc.albums;
			$scope.fellowshipId=$routeParams.id;
			$scope.clickedPost=true;
			//console.log('chk $scope.clickedPost on outer scope');
			//console.log($scope.clickedPost);
			$scope.openAlbum=function($files){
				//console.log('front-end $scope.openAlbum has been called')
				var file = $files;
				for (var i = 0; i < file.length; i++) {
					$scope.files.push(file[i]);
				}
			};

			$scope.cancelAlbumUpload=function(){
				$scope.clickedPost=false;
			};

			$scope.createAlbum=function(){
				//Route:  app.post('/api/albums', albums.createAlbum);
				//console.log('front-end $scope.createAlbum has been called')

				//console.log('chk $scope.imageArray');
				//console.log($scope.imageArray);

				//app.post('/api/albums', albums.createAlbum);
				var album=new AlbumsApiSvc({name:$scope.albumObj.name,
					description:$scope.albumObj.description,
					location:$scope.albumObj.location,
					fellowshipId:$scope.fellowshipId});
				//console.log('chk album');
				//console.log(album);
				album.$save(function(){
					//console.log('chk album obj');
					//console.log(album);

					//create image
					//app.post('/api/albums/:album_id/images', albums.createImage);
					for(var i=0;i<$scope.imageArray.length;i++){

						var image=new ImageApiSvc({path:$scope.imageArray[i].public_id,
							caption:$scope.imageArray[i].caption,
							album_id: album._id
						});

						image.$save(function(){
							//console.log('chk image obj saved to server');
							//console.log(image);
							$scope.clickedPost=false;

							//console.log('chk $scope.clickedPost');
							//console.log($scope.clickedPost);

							//Grab latest album status
							$scope.FellowshipDataSvc.initialize($routeParams.id);
							$scope.albums=$scope.FellowshipDataSvc.albums;

							//console.log('chk $scope.albums');
							//console.log($scope.albums);

						});


					}

				});

			};

		}
	};
});