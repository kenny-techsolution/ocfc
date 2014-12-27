angular.module('app').controller('FellowshipMembersCtrl', function ($http, $scope,
                                                                   IdentitySvc, FellowshipSvc,FellowshipUserSvc, $routeParams,
                                                                   mySocket, $timeout, GoogleMapGeocoderSvc) {


	//Grab all members assoc. to a particular fellowship
	console.log('chk $routeParams obj');
	console.log($routeParams);

	$scope.fellowshipUsers=FellowshipUserSvc.getAllMembers(
		{fellowship_id:$routeParams.id}
		,function(){
			console.log('chk $scope.fellowshipUsers of FellowshipUserSvc.getAllMembers was called');
			console.log($scope.fellowshipUsers);
	});



	//setup approve function here




});