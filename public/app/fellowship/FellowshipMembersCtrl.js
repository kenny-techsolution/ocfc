angular.module('app').controller('FellowshipMembersCtrl', function ($http, $scope,$location,
                                                                   IdentitySvc, FellowshipApiSvc,FellowshipUserApiSvc,FellowshipDataSvc,$routeParams) {

	//setup approve function here
	//update the FellowshipUsers status from 'pending' to 'approved'
	///api/fellowships/:fellowship_id/users/:user_id

	$scope.FellowshipDataSvc = FellowshipDataSvc;
	$scope.FellowshipDataSvc.initialize($routeParams.id);

	$scope.goto = function(subpage){
		$location.path('/fellowship/'+ $routeParams.id + '/' + subpage);
	};

	$scope.approveFellowshipUser = function (fellowshipUser) {
		console.log('front-end approveFellowshipUser has been called');
		console.log('chk fellowshipUser');
		console.log(fellowshipUser);
		//call updateFellowshipById
		fellowshipUser.status = 'approved';
		FellowshipUserApiSvc.update({fellowship_id: $routeParams.id, user_id:fellowshipUser.userId._id}, fellowshipUser).then(
			function(){
				$scope.FellowshipDataSvc.initialize($routeParams.id);
			}
		);
	};

	//Filter status on UI
	$scope.notApproved = function(fellowshipUser){
		return fellowshipUser.status!=='approved';
	};

	$scope.approved = function(fellowshipUser){
		return fellowshipUser.status==='approved';
	};

	//fellowship members
	$scope.membersCondition = "";
	$scope.setMemberFilter = function(type) {
		if(type==='all'){
			$scope.membersCondition = {'status':'approved'};
			return;
		}
		if(type==='admin'){
			console.log('admin');
			$scope.membersCondition = {'role':'admin'};
			return;
		}
		if(type==='pending'){
			$scope.membersCondition = {'status':'pending'};
			return;
		}
		if(type==='new') {
			$scope.membersCondition = function(user){
				var currDate=new Date();
				var signupDate=new Date(user.userId.signupDate);
				return ((currDate.getTime())-(signupDate.getTime())<=2629743830)&&user.status==='approved';
			};
			return;
		}
	};

});


