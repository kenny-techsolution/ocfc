//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcNewFriend', function () {
	return{
		restrict: 'E',
		replace: false,
		scope: {
			users:'='
		}, //isolated scope
		templateUrl: '/partials/common/ocfc-new-friend',
		controller: function ($scope) {
			//logic to populate new friends from fellowship
			$scope.newFriends = function(user){
//				console.log('chk user obj');
//				console.log(user);
				var currDate=new Date();
				var signupDate=new Date(user.userId.signupDate);

//				console.log('chk currDate.getMilliseconds()');
//				console.log(currDate.getTime());
//
//				console.log('chk signupDate.getMilliseconds()');
//				console.log(signupDate.getTime());

				//2629743830 equates to 1 month
				return (currDate.getTime())-(signupDate.getTime())<=2629743830;
			};
		}
	};
});

