//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcBirthday', function (FellowshipUserSvc,ChurchUserSvc,$routeParams) {
	return{
		restrict: 'E',
		scope:{
			users:'='//2 way binding, users is defined on the directive tag
		},
		templateUrl: '/partials/common/ocfc-birthday',
		controller: function ($scope) {

			console.log('chk $routeParams obj');
			console.log($routeParams);

			//logic to populate fellowship users this months birthday
			$scope.comingBirthdays = function(user){
				var currDate=new Date();
				var birthdayObj=new Date(user.userId.birthday);

				return (birthdayObj.getMonth())===(currDate.getMonth());
			};
		}
	};
});