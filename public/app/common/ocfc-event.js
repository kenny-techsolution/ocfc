//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcEvent', function (PostApiSvc,$routeParams,$rootScope) {
	return{
		restrict: 'E',
		scope: {
		},
		templateUrl: '/partials/common/ocfc-event',
		controller: function ($scope) {
			console.log('front-end ocfc-event has been called');

			var queryEventWidget=function(){
				var postArray=PostApiSvc.query({postUnderGroupType: 'fellowship', postUnderGroupId: $routeParams.id,postType:4},function(){
					//console.log('chk $scope.post obj query API within ocfc-event directive');
					//console.log($scope.post);
					$scope.posts=postArray;
					console.log('chk $scope.posts');
					console.log($scope.posts);
				});

			};

			queryEventWidget();

			$rootScope.$on('ocfcWallInput: newEvent', function (event, data) {
				console.log('chk latest post data after emit within ocfc-event.js');
				console.log(data);
				queryEventWidget();
			});

			$rootScope.$on('ocfcEventPost: newEvent', function (event, data) {
				console.log('chk latest post data after emit within ocfc-event.js');
				console.log(data);
				queryEventWidget();
			});

			$scope.upcomingEvents=function(post){
				console.log('chk post.eventId.fromDate');
				console.log(post.eventId.fromDate);

				console.log('chk new Date()');
				console.log(new Date());

				var today=new Date();
				var fromDate=new Date(post.eventId.fromDate);

				//if (fromDate>=today){
					//console.log('fromDate is greater');
				//}else{
					//console.log('fromDate is smaller');
				//}
				return fromDate>=today;
			};

		}
	};
});