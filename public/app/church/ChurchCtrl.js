/*******************************************************************************
 ******************************************************************************/

angular.module('app').controller('ChurchCtrl', function ($http, $scope,ChurchSvc,
                                                             IdentitySvc,FellowshipUserSvc, $routeParams,
                                                             mySocket, $timeout) {
	$scope.churchName;
	$scope.churchWebsite;
	$scope.street;
	$scope.city;
	$scope.state;
	$scope.country;
	$scope.zipcode;
	$scope.phone;
	$scope.fax;
	$scope.faithStatement;
	$scope.mission;
	$scope.vision;


	$scope.createChurch=function(){
		console.log('front-end createChurch has been called');


		var church=new ChurchSvc({name:$scope.churchName,
									url:$scope.churchWebsite,
									address:$scope.street,
									city:$scope.city,
									state:$scope.state,
									country:$scope.country,
									zipcode:$scope.zipcode,
									phone:$scope.phone,
									fax:$scope.fax,
									faithStatement:$scope.faithStatement,
									mission:$scope.mission,
									vision:$scope.vision});

		church.$save();

	};

	//Populate all fellowships to approve
	$scope.churches = ChurchSvc.query(function () {
			console.log('chk $scope.churches');
			console.log($scope.churches);
		}
	);

	$scope.approveChurch=function(church){
		console.log('front-end approveChurch has been called');
		console.log('chk church');
		console.log(church);
		//call updateFellowshipById
		church.approved=true;
		ChurchSvc.update({id:church._id},church);

	};
});

