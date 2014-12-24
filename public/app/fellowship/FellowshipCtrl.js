/*******************************************************************************
 ******************************************************************************/

angular.module('app').controller('FellowshipCtrl', function ($http, $scope,
                                                             IdentitySvc, FellowshipSvc,FellowshipUserSvc, $routeParams,
                                                             mySocket, $timeout) {

	$scope.fellowshipName;
	$scope.churchName;
	$scope.street;
	$scope.city;
	$scope.state;
	$scope.zipcode;
	$scope.phone;
	$scope.aboutFellowship;

	$scope.createFellowship=function(){
		console.log('front-end createFellowship is being called');
		var fellowship=new FellowshipSvc({name:$scope.fellowshipName,
										  address:$scope.street,
										  city:$scope.city,
										  state:$scope.state,
										  country:$scope.country,
										  zipcode:$scope.zipcode,
										  phone:$scope.phone,
										  about:$scope.aboutFellowship});

		fellowship.$save();
		//TODO need to link Fellowship to it's associated church with $scope.churchName
	};

});

