//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcEvent', function (PostApiSvc,$routeParams,$rootScope) {
	return{
		restrict: 'E',
		scope: {
		},
		templateUrl: '/partials/common/ocfc-event',
		controller: function ($scope) {

			var postArray=PostApiSvc.query({postUnderGroupType: 'fellowship', postUnderGroupId: $routeParams.id,postType:4,limit:1},function(post){
				console.log('chk $scope.post obj query API within ocfc-event directive');
				console.log($scope.post);
				$scope.post=postArray[0];
			});

			$rootScope.$on('newEvent', function (event, data) {
				console.log('chk latest post data after emit within ocfc-event.js');
				console.log(data);
				$scope.post=data;
			});


		}
	};
});