//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcAnnouncement', function (IdentitySvc,CommentSvc,_,PostSvc) {
	return{
		restrict: 'E',
		scope: {
			post:'=',
			imagePopup:'=',
			posts:'='
		},
		templateUrl: '/partials/common/ocfc-announcement',
		controller: function ($scope) {
			console.log('ocfcAnnouncement has been called');



		}
	};
});