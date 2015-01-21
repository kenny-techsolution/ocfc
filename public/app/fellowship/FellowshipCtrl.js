/*******************************************************************************
 ******************************************************************************/

angular.module('app').controller('FellowshipCtrl', function ($scope,PostSvc,FellowshipDataSvc,$routeParams) {

	console.log('FellowshipCtrl has been called');

	//include FellowshipDataSvc which captures all data needed for Fellowship widgets
	$scope.FellowshipDataSvc=FellowshipDataSvc;
	$scope.FellowshipDataSvc.initialize($routeParams.id);
	$scope.posts=[];
	//query post data here
	$scope.posts = PostSvc.query({postUnderGroupType:'fellowship',postUnderGroupId:$routeParams.id});
	$scope.selectedPost;

	//console.log('chk $scope.posts array from FellowshipCtrl');
	//console.log($scope.posts);

	//Set default value for imagePopup
	$scope.imagePopup={selectedPost:{
		postBy:{profileImg:''},
		imageIds:[{id:''}]
	},isPopupOpen:false};


	$scope.$watch('imagePopup.isPopupOpen',function(newVal,oldVal){
		console.log(newVal);
	});

	$scope.comingAnnouncements = function(post){
		var currDate=new Date();
		var announcementDate=new Date(post.createdOn);
		var announcementPostType=post.postType;
		var onSameMonth=(announcementDate.getMonth())===(currDate.getMonth());
		var btw0And7Days=((currDate.getDate())-(announcementDate.getDate()))>=0 && ((currDate.getDate())-(announcementDate.getDate()))<=7;

		return (announcementPostType===5&&onSameMonth&&(btw0And7Days));
	};

	$scope.dropdown=[{
		"text": "Edit",
		"click": "editPost()"
	},{
		"text": "Delete",
		"click": "deletePost()"
	}];
});

