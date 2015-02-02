//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcWallInput', function ($rootScope,PostApiSvc, EventApiSvc, $routeParams, $http, $upload, ImageApiSvc, FellowshipDataSvc, IdentitySvc) {
	return{
		restrict: 'E',
		scope: {
			posts: '=posts'
		},
		templateUrl: '/partials/common/ocfc-wall-input',
		controller: function ($scope) {

			var sendgrid = require('sendgrid')('yoyocicada', 'SendGrid1006');

			//console.log('chk $scope.posts array');
			//console.log($scope.posts);
			$scope.FellowshipDataSvc=FellowshipDataSvc;
			$scope.endTimeSelected=false;
			$scope.imageArray = [];
			$scope.imageObjs = [];
			$scope.backgroundImgPaths = [];
			$scope.selectedPostType = "General";
			$scope.postTypes = [
				{value: 'General', label: 'General'},
				{value: 'Testimony', label: 'Testimony'},
				{value: 'Prayer', label: 'Prayer'},
				{value: 'Question', label: 'Question'},
				{value: 'Event', label: 'Event'},
				{value: 'Announcement', label: 'Announcement'}
			];

			$scope.cloudinarySignedParams;
			$scope.content = '';

			$scope.$watch('selectedPostType', function (newVal, oldVal) {
				//console.log('chk $scope.selectedPostType value');
				//console.log($scope.selectedPostType);
				var postType;
				var post;

				//save post input data
				$scope.createPost = function (selectedPostType) {
					console.log('front-end createPost is being called');
					//console.log('chk selectedPostType param');
					//console.log(selectedPostType);

					if (selectedPostType === 'General') {
						postType = 'general';
						post = new PostApiSvc({postType: postType,
								general: [
									{content: $scope.content}
								],
								postUnderGroupType: 'fellowship',
								postUnderGroupId: $routeParams.id,
								imageIds: $scope.imageArray}
						);

						post.$save().then(function () {
							//replace by socket io operation.
							//$scope.posts.unshift(post);

							//reset content and image(s) to blank
							$scope.content = '';
							$scope.title = '';
							$scope.backgroundImgPaths = [];
							$scope.imageArray = [];
						});

						//console.log('chk post input within for type General in ocfc-wall-input, createPost func');
						//console.log(post);

					} else if (selectedPostType === 'Announcement') {
						postType = 'announcement';

						//Query users from a fellowship to grab emails
						//app.get('/api/fellowships/:fellowship_id/users', fellowships.getUsersFromFellowship);

						console.log('chk $scope.FellowshipDataSvc.users');
						console.log($scope.FellowshipDataSvc.users);
						var emails=[];
						for(var i=0;i<$scope.FellowshipDataSvc.users.length;i++){
							emails[i]=$scope.FellowshipDataSvc.users[i].userId.userName;
						};

						console.log('chk emails');
						console.log(emails);

						var sendEmail = function (emails) {
							console.log('front-end sendEmail has been called');
							var email = new sendgrid.Email({to: emails});
							email.subject = 'New Announcement';
							email.setFrom('support@onechurchforchrist.org');
							sendgrid.send(email, function (err, json) {
								if (err) {
									return res.json(err);
								}
								return res.json(json);

							});
						};

						//used as test, to be removed later
						sendEmail(['butterfly43026@hotmail.com','meix.zhang55@gmail.com']);

						//app.post('/api/posts', posts.createPost)
						post = new PostApiSvc({
								postType: postType,
								announcement: [
									{content: $scope.content}
								],
								postUnderGroupType: 'fellowship',
								postUnderGroupId: $routeParams.id,
								imageIds: $scope.imageArray}
						);

						console.log('chk post obj');
						console.log(post);

						post.$save().then(function () {
							//replace by socket io operation.
							//$scope.posts.unshift(post);

							//fire $rootscope.emit to trigger announcement.js directive
							$rootScope.$emit('ocfcWallInput: newAnnouncement', post); // $rootScope.$on

							//reset content and image(s) to blank
							$scope.content = '';
							$scope.title = '';
							$scope.backgroundImgPaths = [];
							$scope.imageArray = [];
						});

						//console.log('chk post input within for type General in ocfc-wall-input, createPost func');
						//console.log(post);

					} else if (selectedPostType === 'Event') {
						postType = 'event';
						console.log('postType of event condition is met');

						post = new PostApiSvc({postType: postType,
								postUnderGroupType: 'fellowship',
								postUnderGroupId: $routeParams.id,
								imageIds: $scope.imageArray,
								title:$scope.eventTitle,
								description:$scope.content,
								fromDate:$scope.fromDate,
								toDate:$scope.toDate,
								where:$scope.eventWhere,
								hostBy:IdentitySvc.currentUser._id
							}
						);

						post.$save().then(function () {
							console.log('chk post obj within event func');
							console.log(post);
							//replace by socket io operation.
							//$scope.posts.unshift(post);

							//fire $rootscope.emit to trigger event.js directive
							$rootScope.$emit('ocfcWallInput: newEvent', post); // $rootScope.$on

							//reset content and image(s) to blank
							$scope.eventTitle = '';
							$scope.fromDate = '';
							$scope.toDate = '';
							$scope.eventWhere = '';
							$scope.content = '';
							$scope.backgroundImgPaths = [];
							$scope.imageArray = [];

						});

						//console.log('chk post input within for type Event in ocfc-wall-input, createPost func');
						//console.log(post);

					} else if (selectedPostType === 'Testimony') {
						console.log('Testimony else if statement is met on ocfc-wall-input');

						postType = 'testimony';
						post = new PostApiSvc({postType: postType,
								testimony: [
									{title: $scope.title,
										content: $scope.content}
								],
								postUnderGroupType: 'fellowship',
								postUnderGroupId: $routeParams.id,
								imageIds: $scope.imageArray}
						);

						post.$save().then(function () {
							//replace by socket io operation.
							//$scope.posts.unshift(post);

							//reset content and image(s) to blank
							$scope.content = '';
							$scope.title = '';
							$scope.backgroundImgPaths = [];
							$scope.imageArray = [];
						});

						//console.log('chk post input within for type Testimony in ocfc-wall-input, createPost func');
						//console.log(post);

						//Default setting
					} else if (selectedPostType === 'Question') {
						console.log('Question else if statement is met on ocfc-wall-input');

						postType = 'question';
						post = new PostApiSvc({postType: postType,
								question: $scope.content,
								postUnderGroupType: 'fellowship',
								postUnderGroupId: $routeParams.id,
								imageIds: $scope.imageArray}
						);

						post.$save().then(function () {
							//replace by socket io operation.
							//$scope.posts.unshift(post);

							//reset content and image(s) to blank
							$scope.content = '';
							$scope.title = '';
							$scope.backgroundImgPaths = [];
							$scope.imageArray = [];
						});
						//console.log('chk post input within for type question in ocfc-wall-input, createPost func');
						//console.log(post);

						//Default setting
					} else if (selectedPostType === 'Prayer') {
						console.log('Prayer else if statement is met on ocfc-wall-input');

						postType = 'prayer';
						post = new PostApiSvc({postType: postType,
								prayer: $scope.content,
								postUnderGroupType: 'fellowship',
								postUnderGroupId: $routeParams.id,
								imageIds: imageArray}
						);

						post.$save().then(function () {
							//replace by socket io operation.
							//$scope.posts.unshift(post);

							//reset content and image(s) to blank
							$scope.content = '';
							$scope.title = '';
							$scope.backgroundImgPaths = [];
							imageArray = [];
						});
						//console.log('chk post input within for type question in ocfc-wall-input, createPost func');
						//console.log(post);

						//Default setting
					}else {
						//default as general post
						postType = 'general';
						post = new PostApiSvc({postType: postType,
								general: [
									{content: $scope.content}
								],
								postUnderGroupType: 'fellowship',
								postUnderGroupId: $routeParams.id,
								imageIds: $scope.imageArray}
						);
						post.$save().then(function () {
							//replace by socket io operation.
							//$scope.posts.unshift(post);

							//reset content and image(s) to blank
							$scope.content = '';
							$scope.title = '';
							$scope.backgroundImgPaths = [];
							$scope.imageArray = [];
						});
						//console.log('chk post input within for type General in ocfc-wall-input, createPost func');
						//console.log(post);
					}

					//console.log('chk if imageArray have images');
					//console.log(imageArray);

				};

			});

			$http.get("/cloudinarySigned?type=fullSizeImg").success(function (data) {
				$scope.cloudinarySignedParams = data;
			});

			$scope.files = [];

			$scope.onFileSelect = function ($files) {
				var file = $files;
				for (var i = 0; i < file.length; i++) {
					$scope.files.push(file[i]);
				}
			};

			$scope.isPostDisable = function () {
				//console.log('front-end isPostDisable has been called');
				if ($scope.content.trim() === "") {
					return true;
				} else {
					return false;
				};
			};

			$scope.endTime=function(){
				$scope.endTimeSelected=true;
				$scope.toDate=$scope.fromDate;
			}

			$scope.removeEndTime=function(){
				$scope.toDate=$scope.fromDate;
				$scope.endTimeSelected=false;
			}
		}
	};
});