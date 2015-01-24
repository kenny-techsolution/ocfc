angular.module('app').controller('ApproveFellowshipCtrl', function ($http, $scope,
                                                             IdentitySvc, FellowshipApiSvc) {
	$scope.fellowshipName;
	$scope.churchName;
	$scope.street="";
	$scope.city="";
	$scope.state="";
	$scope.zipcode="";
	$scope.country="";
	$scope.phone;
	$scope.aboutFellowship;

	//Populate all fellowships to approve
	$scope.fellowships = FellowshipApiSvc.query(function () {
			console.log('chk $scope.fellowships');
			console.log($scope.fellowships);
		}
	);

	$scope.approveFellowship=function(fellowship){
		console.log('front-end approveFellowship has been called');
		console.log('chk fellowship');
		console.log(fellowship);
		//call updateFellowshipById
		fellowship.approved=true;
		FellowshipApiSvc.update({id:fellowship._id},fellowship);

	};

});
