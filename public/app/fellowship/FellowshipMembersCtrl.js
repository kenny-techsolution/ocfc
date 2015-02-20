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
	$scope.selectedMemberType = 'all';
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

			return;
		}
	};
	$scope.newCondition = function(user){
		var currDate=new Date();
		var signupDate=new Date(user.userId.signupDate);
		return ((currDate.getTime())-(signupDate.getTime())<=2629743830)&&user.status==='approved';
	};

	//email invitation

	$scope.$watch('FellowshipDataSvc.fellowship',function(newVal){
		if(newVal){
			$scope.reloadInviteHistory();
		}
	}, true);
	$scope.nameEmailObj = {
		inputNameEmail:'',
	};
	$scope.inputNameEmailError = '';
	$scope.nameEmails = [];
	$scope.message;
	$scope.savedInvites = [];
	$scope.reloadInviteHistory = function () {
		console.log("$scope.reloadInviteHistory");
		console.log($scope.FellowshipDataSvc.fellowship);
		$http.get('/api/inviteOtherToFellowships?fellowshipId=' + $scope.FellowshipDataSvc.fellowship._id).success(function(invites){
			console.log("savedInvites");
			console.log(invites);
			$scope.savedInvites = invites;
		});
	};
	$scope.enterEmail = function(){
		//validate first
		console.log($scope.nameEmailObj.inputNameEmail);
		var commaPos = $scope.nameEmailObj.inputNameEmail.indexOf(',');
		console.log("commaPos");
		console.log(commaPos);
		if(commaPos==-1||commaPos==0) {
			$scope.inputNameEmailError = "Please provided name to the email.";
			return;
		}
		var inputNameEmailSplite = $scope.nameEmailObj.inputNameEmail.split(',');
		var name = inputNameEmailSplite[0].trim();
		var email =  inputNameEmailSplite[1].trim();
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   		if(!re.test(email)) {
			$scope.inputNameEmailError = "Please provided valid email.";
			return;
   		}
		var nameEmail = {
			name: name,
			email: email
		};
		$scope.inputNameEmailError='';
		$scope.nameEmailObj = '';
		$scope.nameEmails.push(nameEmail);
	};
	$scope.removeEmail = function(index) {
		$scope.nameEmails.splice(index, 1);
	};
	$scope.sendInvite = function() {
		var postData = {
			fellowshipId : $scope.FellowshipDataSvc.fellowship._id,
			nameEmails : $scope.nameEmails,
			message: $scope.message
		};
		$http.post("/api/inviteOtherToFellowships/batch",postData).success(function(data){
			console.log("data");
			console.log(data);
			$scope.reloadInviteHistory();
		}).error(function(data){
			console.log("data");
			console.log(data);
		});
	};
});


