/*******************************************************************************
 ******************************************************************************/

angular.module('app').controller('FellowshipCtrl', function ($scope,PostSvc,FellowshipDataSvc,$routeParams) {

	//include FellowshipDataSvc which captures all data needed for Fellowship widgets
	$scope.FellowshipDataSvc=FellowshipDataSvc;
	$scope.FellowshipDataSvc.initialize($routeParams.id);
	$scope.posts=[];

	//query post data here
	$scope.posts = PostSvc.query({postUnderGroupType:'fellowship',postUnderGroupId:$routeParams.id},function() {
			console.log('front-end $scope.posts has been called');
			//console.log('chk $scope.posts');
			//console.log($scope.posts);
		}
	);

	$scope.selectedPost;
	$scope.imagePopup={selectedPost:{
		postBy:{profileImg:''},
		imageIds:[{id:''}]
	},isPopupOpen:false};

	$scope.$watch('imagePopup.isPopupOpen',function(newVal,oldVal){

		console.log(newVal);
	});

	console.log('chk $scope.imagePopup.isPopupOpen on FellowshipCtrl');
	console.log($scope.imagePopup.isPopupOpen);

});

