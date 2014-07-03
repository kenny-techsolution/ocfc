/*******************************************************************************
 ******************************************************************************/
angular.module('app').controller('FellowshipCtrl', function($fileUploader, $http, $scope, FellowshipSvc,$routeParams,PostSvc,TransformSvc) {
    $scope.formData = {};
	$scope.about;
	$scope.name;
	$scope.id;
	$scope.post = {
		content:"",
		type:0,
		visibility:"",
		postDate:"",
		fellow_object_id:$routeParams.id
	};
	$scope.placeholder;
	$scope.currVisibility;
	$scope.loading = true;
	$scope.photoUploaded = false;
	$scope.imagePath;

	$scope.visibilityOptions = [
		{ id: 1, name: 'Public' },
		{ id: 2, name: 'Church' },
		{ id: 3, name: 'World' }
	];
	$scope.isPostShown=false;


    var uploader = $scope.uploader = $fileUploader.create({
        scope: $scope,
        url: '/file-upload', 
        formData : $scope.formData
    });
    uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
        var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
        type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    });
    
    $scope.uploadFile = function () {
        
    };

    var fellow = FellowshipSvc.get(
        {
            _id: $routeParams.id}
        //below parameter is a callback, 1st parameter must be met
        ,function() {
            $scope.about=fellow.about;
            $scope.name = fellow.name;
            $scope.id = fellow._id;
        }

    );
	$scope.placeHolderStrs = [
		"Share your testimony",
		"What is your question?",
		"What's on your mind?"
	];

    $scope.onClickType=function(type){
	    $scope.post.type = TransformSvc.toPostTypeInt(type);
	    $scope.placeholder = $scope.placeHolderStrs[$scope.post.type];
    };

    //5.24.2014 method that transform Type values to string
	$scope.transformType=TransformSvc.toPostTypeStr;

	//6.26.2014 created displayPost function
	$scope.displayPost=function(){
		console.log('isPostShown works');
		$scope.isPostShown=!$scope.isPostShown;
		console.log($scope.isPostShown);
	};

    $scope.createPost = function(e) {
        e.preventDefault();
        $scope.post.visibility=$scope.currVisibility.id;
        $scope.post.postDate=new Date();
        $scope.post.fellow_object_id;
        var newPost = new PostSvc($scope.post);
        //standard Rest API call
        newPost.$save().then(function(data) {
                console.log(data);
                $scope.formData.post_id = data._id;
                console.log("current post id");
                console.log($scope.formData);
                $scope.posts.unshift(newPost.post);
            },function(reason){
            }
        );
    };

    //5.24.2014, query all posts made within a fellowship
    $scope.posts =PostSvc.query({
        fellow_object_id:$scope.post.fellow_object_id  //where clause
    }, function() {
//        console.log($scope.posts);
    });

    //5.26.2014 update Post by adding on comment
    $scope.addComment = function(id,comment) {
	    PostSvc.update({
            _id: id  //where clause
        }, {comments:comment},function(){

        });
    };
    $scope.addPhoto = function() {
        $("input.upload-image").click();
    };

});

