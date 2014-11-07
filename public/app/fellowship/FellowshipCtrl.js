/*******************************************************************************
 ******************************************************************************/
angular.module('app').controller('FellowshipCtrl', function ($fileUploader, $http, $scope, IdentitySvc, FellowshipSvc, $routeParams, PostSvc, TransformSvc, mySocket) {

	//TODO: image uploading functionality.
	var uploader = $scope.uploader = $fileUploader.create({
		scope: $scope,
		url: '/file-upload',
		formData: $scope.formData
	});
	uploader.filters.push(function (item /*{File|HTMLInputElement}*/) {
		var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
		type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
		return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
	});

	$scope.uploadFile = function () {

	};

	$scope.addPhoto = function () {
		$("input.upload-image").click();
	};

	/******************************** Socket IO ********************************/
		//calling mySocket.on to the server
	mySocket.on('routesSocket', function (data) {
		console.log(data);
		var emittedPost = new PostSvc(data.post);
		$scope.posts.unshift(emittedPost);
		console.log('chk $scope.posts');
		console.log($scope.posts);
	});

	/*************************** initialize variables here ********************/
	$scope.formData = {};
	$scope.loading = true;
	$scope.photoUploaded = false;
//	$scope.currVisibility;
//	$scope.imagePath;

	/***** Visibility variables *****/
	$scope.visiObj = {
		visibilityOptions: [
			{ id: 1, name: 'Public' },
			{ id: 2, name: 'Church' },
			{ id: 3, name: 'World' }
		],
		visibility: {
			fellowship: true,
			church: false,
			world: false
		}
	};

	/***** Fellowship variables *****/
	$scope.fellowObj = {
		about: '',
		name: '',
		id: ''
	};

	var fellow = FellowshipSvc.get(
		{
			_id: $routeParams.id}
		//below parameter is a callback, 1st parameter must be met
		, function () {
			$scope.fellowObj.about = fellow.about;
			$scope.fellowObj.name = fellow.name;
			$scope.fellowObj.id = fellow._id;
		}
	);

	/*****General Post Variables *****/
	$scope.postObj = {
		testimonyPost: {
			type: 0,
			content: '',
			title:'',
			placeholder:"Share your testimony"
		},
		questionPost: {
			type: 1,
			content: '',
			placeholder:"What is your question?"
		},
		generalPost: {
			type: 2,
			content: '',
			placeholder:"What's on your mind?"
		},
		eventPost: {
			event:'create ObjectId here',
			from_date:'',
			from_date_time:'',
			to_date:'',
			to_date_time:'',
			where:'',
			welcome:'',
			type: 3,
			title: '',
			content: '',
			placeholder:"What event to plan?"
		},
		fellow_object_id: $routeParams.id,
		content:'',
		visibility: '',
		postBy: '',
		postDate: '',
		isPostShown: false,
		postType:'general',
		type: 2,
		placeholder: '',
		placeHolderStrs: [
			"Share your testimony",
			"What is your question?",
			"What's on your mind?",
			"What event to plan?"],
		title:''
	};

//	$scope.onClickType = function (type) {
//		//Set $scope.post.type to integer value (0=testimony,1=question,2=general,3=event)
//		$scope.postObj.type = TransformSvc.toPostTypeInt(type);
//
//		//Set $scope.placeholder to the appropriate $scope.placeHolderStrs string
//		// using $scope.post.type value as index
//		$scope.postObj.placeholder = $scope.postObj.placeHolderStrs[$scope.postObj.type];
//	};
//



//	//5.24.2014 method that transform Type values to string
//	//Set $scope.transformType to either testimony, question or general string
//	//by using type value as index
//	$scope.postObj.transformType = TransformSvc.toPostTypeStr($scope.postObj.type);

	//6.26.2014 created displayPost function
	//Call $scope.displayPost function when
	// $scope.isPostShown equates False
	$scope.displayPost = function () {
		//assigning to opposite
		$scope.postObj.isPostShown = !$scope.postObj.isPostShown;
	};

	$scope.createPost = function (e, type) {
		//Default preventDefault() event action will not be triggered.
		e.preventDefault();
		$scope.postObj.type = type;
		//$scope.postType is an inline function created on ocfc-wall-category
		$scope.postObj.postType=$scope.postType;
		//Set $scope.post.visibility variable to an array that captures fellow_object_id
		$scope.postObj.visibility = [$scope.postObj.fellow_object_id];
		//Set $scope.post.postDate to current date
		$scope.postObj.postDate = new Date();
		//Set $scope.post.fellow_object_id as itself
		$scope.postObj.fellow_object_id = $scope.postObj.fellow_object_id;
		//Set $scope.post.postBy to currentUser id
		$scope.postObj.postBy = IdentitySvc.currentUser._id;

		//11.4.2014 Set post content entries
		switch ($scope.postObj.type) {
			case 0: //testimony
				$scope.postObj.testimonyPost.content = $scope.postObj.content;
				$scope.postObj.testimonyPost.title=$scope.postObj.title;

				break;
			case 1: //question
				$scope.postObj.questionPost.content = $scope.postObj.content;

				break;
			case 2: //general
				$scope.postObj.generalPost.content = $scope.postObj.content;

				break;
			case 3: //event
				$scope.postObj.eventPost.content = $scope.postObj.content;
				$scope.postObj.eventPost.title=$scope.postObj.title;

				break;
			default:
				$scope.postObj.generalPost.content = $scope.postObj.content;
		};

		//Resource object allows $scope.post as parameter
		var newPost = new PostSvc($scope.postObj);

		//standard Rest API call
		newPost.$save().then(function (data) {
				//assign data.post._id into $scope.formData.post_id object
				$scope.formData.post_id = data.post._id;

				//The unshift() method adds one or more elements
				// to the beginning of $scope.posts array and
				// returns the new length of the array.
				$scope.posts.unshift(newPost);
			}, function (reason) {
			}
		);
		console.log('New post results');
		console.log(newPost);

	};

	//5.24.2014, query all posts made within a fellowship
	$scope.posts = PostSvc.query({
		fellow_object_id: $scope.postObj.fellow_object_id  //where clause
	}, function () {

	});

	//5.26.2014 update Post by adding on comment
	$scope.addComment = function (id, comment) {
		PostSvc.update({
			_id: id  //where clause
		}, {comments: comment}, function () {

		});
	};


	//		$scope.createPost = function(e,type,postObj) {
//				e.preventDefault();
//				var post = postObj;
//
//			//return;
//			//TODO: will change this use to the visibility array later.
//				post.visibility=[$routeParams.id];
//				post.postDate=new Date();
//				var newPost = new PostSvc(post);
//				//standard Rest API call
//				newPost.$save().then(function(data) {
//								console.log(data);
//								$scope.formData.post_id = data._id;
//								console.log("current post id");
//								console.log($scope.formData);
//								$scope.posts.unshift(newPost.post);
//						},function(reason){
//						}
//				);
//		};


});

