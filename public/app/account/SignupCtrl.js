/*************************************************************************************
 This file creates a new Controller called SignupCtrl
 which takes $scope, UserSvc.js, NotifierSvc,$location,AuthSvc.js
 directives

 newUserData object is created containing username, password, firstName and LastName

 Checks data against AuthSvc.js to insure data is correct
 *************** ************************************************************************/

angular.module('app').controller('SignupCtrl', function ($scope, UserSvc, NotifierSvc, $location, AuthSvc) {
			$scope.signin = function (username, password) {
				AuthSvc.authenticateUser(username, password).then(function (success) {
					if (success) {
						NotifierSvc.notify('You have successfully signed in!');
					} else {
						NotifierSvc.notify('Username/Password combination incorrect');
					}
				});
			};

			$scope.signup = function () {
				var birthday = new Date($scope.year, $scope.month-1, $scope.day);

				var newUserData = {
					fullName: $scope.fullName,
					userName: $scope.email,
					password: $scope.password,
					birthday: birthday,
					gender: $scope.gender
				};

				console.log('chk newUserData');
				console.log(newUserData);
				return;

				//newUser creates new instance of UserSvc service resource object
				//it then gets saved & data is passed into IdentitySvc.currentUser
				AuthSvc.createUser(newUserData).then(function () {
						console.log('test newUserData dataset for signup');
						console.log(newUserData);
						NotifierSvc.notify('User account created!');
						$location.path('/');
					}
					, function (reason) {
						NotifierSvc.error(reason);
					})
			}
});