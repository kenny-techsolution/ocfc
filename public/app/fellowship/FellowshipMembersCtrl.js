angular.module('app').controller('FellowshipMembersCtrl', function ($http, $scope,
                                                                   IdentitySvc, FellowshipSvc,FellowshipUserSvc, $routeParams,
                                                                   mySocket, $timeout, GoogleMapGeocoderSvc) {

	//Grab all members assoc. to a particular fellowship
	console.log('chk $routeParams obj');
	console.log($routeParams);

	$scope.fellowshipUsers = FellowshipUserSvc.getAllMembers(
		{fellowship_id: $routeParams.id}
		, function () {
			console.log('chk $scope.fellowshipUsers of FellowshipUserSvc.getAllMembers was called');
			console.log($scope.fellowshipUsers);
		});

	//setup approve function here
	//update the FellowshipUsers status from 'pending' to 'approved'
	///api/fellowships/:fellowship_id/users/:user_id

	$scope.approveFellowshipUser = function (fellowshipUser) {
		console.log('front-end approveFellowshipUser has been called');
		console.log('chk fellowshipUser');
		console.log(fellowshipUser);
		//call updateFellowshipById
		fellowshipUser.status = 'approved';
		FellowshipUserSvc.update({fellowship_id: $routeParams.id, user_id:fellowshipUser.userId._id}, fellowshipUser);

	};

	//Filter status on UI
	$scope.notApproved = function(fellowshipUser){
		return fellowshipUser.status!=='approved';
	};

	$scope.approved = function(fellowshipUser){
		return fellowshipUser.status==='approved';
	};



});


