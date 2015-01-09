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
				var file = $files[0]; // we're not interested in multiple file uploads here
				$scope.upload = $upload.upload({
					url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
					data: $scope.cloudinarySignedParams,
					file: file
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
					}
					$scope.$apply();
				}).success(function (data, status, headers, config) {
					console.log('success method is being called');
					console.log('chk data');
					console.log(data);
					$scope.backgroundImgPath = 'url('+data.url+')';
					$scope.$apply();

					//call create image
					console.log('front-end createFellowship is being called');
					var image=new ImageSvc({path:data.url,
											album_id:FellowshipDataSvc.fellowship.defaultAlbumId});
					image.$save(function(){
						console.log('image has been created');
						console.log(image);

						//append image ids onto post object
						imageArray.push(image._id);

						console.log('chk $scope.post');
						console.log($scope.post);

					});



				});
			};

		}
	};
});