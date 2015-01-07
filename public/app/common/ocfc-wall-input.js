//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcWallInput', function () {
	return{
		restrict: 'E',
		scope: {
		},
		templateUrl: '/partials/common/ocfc-wall-input',
		controller: function ($scope) {

			$scope.selectedPostType = "General";
			$scope.postTypes = [{value:'General',label:'General'},
							 {value:'Testimony',label:'Testimony'},
							 {value:'Prayer',label:'Prayer'},
							 {value:'Question',label:'Question'},
							 {value:'Event',label:'Event'},
							 {value:'Announcement',label:'Announcement'}];



		}
	};
});