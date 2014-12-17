/*******************************************************************************
 ******************************************************************************/

angular.module('app').controller('FellowshipCtrl', function ($http, $scope,
                                                             IdentitySvc, FellowshipSvc,FellowshipUserSvc, $routeParams,
                                                             PostSvc, EventSvc,TransformSvc, mySocket, $timeout) {

	$scope.userId=IdentitySvc.currentUser._id;
	console.log('chk $scope.userId');
	console.log($scope.userId);

	$scope.fellowship = FellowshipSvc.get(
		{
			_id: $routeParams.id}
		//below parameter is a callback, 1st parameter must be met
		, function () {
			$scope.name = fellowship.name;
		}
	);

	console.log('chk $scope.fellowship');
	console.log($scope.fellowship);


	$scope.fellowshipUsers = FellowshipUserSvc.get(
		{
			fellowshipId: $routeParams.fellowship_id}
		//below parameter is a callback, 1st parameter must be met
		, function () {
//			$scope.signupDate = fellowshipUsers.signupDate;
//			$scope.status = fellowshipUsers.status;
//			$scope.firstName = fellowshipUsers.userId.firstName;
//			$scope.lastName = fellowshipUsers.userId.lastName;
		}
	);

	console.log('chk $scope.fellowshipUsers');
	console.log($scope.fellowshipUsers);

});

