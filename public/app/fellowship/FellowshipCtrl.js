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

	//Populate all fellowships to approve
	$scope.fellowships = FellowshipSvc.query(function () {
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
		FellowshipSvc.update({id:fellowship._id},fellowship);

	};



});

