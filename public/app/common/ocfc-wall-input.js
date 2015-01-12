//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcWallInput', function (PostSvc,$routeParams,$http,$upload,ImageSvc,FellowshipDataSvc) {
	return{
		restrict: 'E',
		scope: {
			posts:'=posts'
		},
		templateUrl: '/partials/common/ocfc-wall-input',
		controller: function ($scope) {
			var imageArray=[];
			$scope.backgroundImgPaths = [];
			var imageObjs=[];

			$scope.selectedPostType = "General";
			$scope.postTypes = [{value:'General',label:'General'},
							 {value:'Testimony',label:'Testimony'},
							 {value:'Prayer',label:'Prayer'},
							 {value:'Question',label:'Question'},
							 {value:'Event',label:'Event'},
							 {value:'Announcement',label:'Announcement'}];


			//save post input data
			$scope.createPost=function(selectedPostType){
				console.log('front-end createPost is being called');

				console.log('chk selectedPostType value');
				console.log(selectedPostType);

				var postType;

				if (selectedPostType=='General'){
					postType='general';
				}else{
					//default as general post
					postType='general';
				}

				var post=new PostSvc({postType:postType,
									  general:[{content:$scope.content}],
									  postUnderGroupType:'fellowship',
									  postUnderGroupId:$routeParams.id,
									  imageIds:imageArray}
				);

				console.log('chk post obj before saving it');
				console.log(post);

				post.$save().then(function(){
					console.log('chk if post data has been saved in Post dataset');
					console.log(post);
					console.log('chk $scope.posts');
					console.log($scope.posts);
					$scope.posts.unshift(post);


				});
			};

			$scope.cloudinarySignedParams;
			$http.get("/cloudinarySigned?type=avatar").success(function(data){
				$scope.cloudinarySignedParams = data;
				console.log('chk $.cloudinary.config()');
				console.log($.cloudinary.config());
			});


			$scope.onFileSelect = function($files) {
				var file = $files;
				console.log('chk file confirm that it is an array');
				console.log(file);

				console.log('chk file.length');
				console.log(file.length);

				for(var i=0;i<file.length;i++){
					console.log('for loop has been triggered');
					$scope.upload = $upload.upload({
						url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
						data: $scope.cloudinarySignedParams,
						file: file[i]
					}).progress(function (e) {
						console.log('progress method is being called');
						$scope.progress = Math.round((e.loaded * 100.0) / e.total);
						console.log('chk $scope.progress');
						console.log($scope.progress);
						if($scope.progress==100){
							console.log('$scope.progress==100 IF statement has been called');
							setTimeout(function(){
								$scope.progress = 0;
							},10000);
							console.log('chk $scope.upload');
							console.log($scope.upload);
						}
						$scope.$apply();
					}).success(function (data, status, headers, config) {
						console.log('success method is being called');
						console.log('chk data');
						console.log(data);

						$scope.backgroundImgPaths.push(data.url);

						console.log('chk $scope.backgroundImgPaths');
						console.log($scope.backgroundImgPaths);


						$scope.$apply();

						//call create image
						console.log('front-end new image creation has been called');
						var image=new ImageSvc({path:data.url,
							album_id:FellowshipDataSvc.fellowship.defaultAlbumId});
						image.$save(function(){
							console.log('image has been created');
							console.log(image);

							//append image ids onto post object
							imageArray.push(image._id);

							console.log('chk imageArray');
							console.log(imageArray);

							imageObjs.push({image_id:image._id,image_path:image.path});
							console.log('chk imageObjs within new image creation');
							console.log(imageObjs);

						});
					});
				}
			};
			$scope.deleteImage=function($index,backgroundImgPath){
				console.log('front-end $scope.deleteImage has been called');

				if (imageObjs[$index].image_path===backgroundImgPath){
					console.log('if statement condition met');

					var removedImage = ImageSvc.get({album_id:FellowshipDataSvc.fellowship.defaultAlbumId,
						image_id:imageObjs[$index].image_id}, function() {
						console.log('image delete resource API called');

						removedImage.album_id=FellowshipDataSvc.fellowship.defaultAlbumId;
						removedImage.image_id=removedImage._id;

						var removeImgFromPost=removedImage.image_id;

						removedImage.$delete(function(){
							console.log('delete callback is called');

						//remove image from front-end
						$scope.backgroundImgPaths=_.filter($scope.backgroundImgPaths, function(image){

							return image !== $scope.backgroundImgPaths[$index];
						});

//							console.log('chk $scope.backgroundImgPaths');
//							console.log($scope.backgroundImgPaths);
//
//							console.log('chk imageObjs');
//							console.log(imageObjs);
//
//							console.log('chk $index');
//							console.log($index);

							imageObjs.splice($index, 1);

							console.log('chk removeImgFromPost');
							console.log(removeImgFromPost);


							var index=imageArray.indexOf(removeImgFromPost);
							imageArray.splice(index,1);

							console.log('chk imageArray after splice');
							console.log(imageArray);


//							console.log('chk imageObjs after splice');
//							console.log(imageObjs);

						});

					});


				}

			};
		}
	};
});