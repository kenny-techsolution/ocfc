angular.module('app').directive('ocfcLandingPage', function (UserSvc, NotifierSvc, $location, AuthSvc) {
	return{
		restrict: 'E',
		templateUrl: '/partials/main/ocfc-landing-page',
		$scope: {},
		controller: function ($scope) {
			//$scope.bdateReason = NotifierSvc.notify('Click for more information');

			console.log('chk ocfc-landing-page directive');

			$scope.signin = function (username, password) {
				AuthSvc.authenticateUser(username, password).then(function (success) {
					if (success) {
						NotifierSvc.notify('You have successfully signed in!');
					} else {
						NotifierSvc.notify('Username/Password combination incorrect');
					}
				});
			};

//			$scope.signup = function () {
//				var newUserData = {
//					firstName: $scope.fname,
//					lastName: $scope.lname,
//					userName: $scope.email,
//					password: $scope.password,
//					birthday: {month: $scope.month,
//						day: $scope.day,
//						year: $scope.year},
//					gender: $scope.gender
//				};
//
//				//newUser creates new instance of UserSvc service resource object
//				//it then gets saved & data is passed into IdentitySvc.currentUser
//				AuthSvc.createUser(newUserData).then(function () {
//						console.log('test newUserData dataset for signup');
//						console.log(newUserData);
//						NotifierSvc.notify('User account created!');
//						$location.path('/');
//					}
//					, function (reason) {
//						NotifierSvc.error(reason);
//					})
//			}
		}
	};
});