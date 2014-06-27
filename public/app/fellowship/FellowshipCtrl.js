/*******************************************************************************
 ******************************************************************************/
angular.module('app').controller('FellowshipCtrl', function($fileUploader, $http, $scope, FellowshipSvc,$routeParams,PostSvc) {
    $scope.formData = {};
	$scope.about;
	$scope.name;
	$scope.id;
	$scope.placeholder="What's on your mind?";
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

    $scope.onClickType=function(type){
        if(type==='testimony'){
            $scope.post.type=0;
            $scope.placeholder="Share your testimony";
	        console.log('called testimony')
        }else if(type==='question'){
            $scope.post.type=1;
            $scope.placeholder="What is your question?";
	        console.log('called question')
        }else if (type==='general'){
	        $scope.post.type=2;
	        $scope.placeholder="What's on your mind?"
	        console.log('called general')
        }else{
	    }
    };

    //5.24.2014 method that transform Type values to string
    $scope.transformType=function(type){
        if(type===0){
            return 'Testimony'
        }else if(type===1) {
	        return 'Question'
        }else if (type==2){
	        return 'General'
        }else{
        }
    };

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

