angular.module('app').controller('SettingCtrl', function ($scope, $http,IdentitySvc,UserSvc) {
	$scope.oldPassword;
	$scope.newPassword;
	$scope.fullName;
	$scope.email;
	$scope.year;
	$scope.month;
	$scope.day;
	$scope.disableFullName=true;
	$scope.disableEmail=true;

	//Get user info & populate it on the input fields
	var currentUser=IdentitySvc.currentUser;
	console.log('chk currentUser obj');
	console.log(currentUser);

	$scope.fullName=currentUser.fullName;
	$scope.email=currentUser.userName;


	//$watch function used to enable UPDATE button
	//only if there are difference in values against
	//User dataset
	$scope.$watch('fullName',function(newVal){
		if(newVal === currentUser.fullName){
			$scope.disableFullName=true;
		}else{
			$scope.disableFullName=false;
		}
	});

	$scope.$watch('email',function(newVal){
		if(newVal === currentUser.userName){
			$scope.disableEmail=true;
		}else{
			$scope.disableEmail=false;
		}
	});


	//Set Ng-Click on UPDATE button & assign to updateUser API call
	$scope.updateUser = function() {
		var user=new UserSvc();
		user.fullName=$scope.fullName;
		user.userName=$scope.email;

		UserSvc.update(
			{id: currentUser._id}
			, user
		);
	};

	$scope.updateUserPassword = function() {
		$http.put('/api/updatePassword',{oldPassword:$scope.oldPassword,newPassword:$scope.newPassword}).success(function(){
			console.log('front-end updateUserPassword call successful');
		}).error(function(){
			console.log('front-end updateUserPassword call failed');
		})
	}
});