/*******************************************************************************
 ******************************************************************************/

angular.module('app').controller('FellowshipCtrl', function ($scope,PostSvc,FellowshipDataSvc,$routeParams) {

	//include FellowshipDataSvc which captures all data needed for Fellowship widgets
	//	console.log("controller  kdfj;lakdjfl;askdjf;aklsj");
	$scope.FellowshipDataSvc=FellowshipDataSvc;
	$scope.FellowshipDataSvc.initialize($routeParams.id);


	//query post data here
	$scope.posts = PostSvc.query(function () {
			console.log('chk $scope.posts');
			console.log($scope.posts);
		}
	);


});

