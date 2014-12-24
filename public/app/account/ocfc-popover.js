//Close Popover when Clicking Outside
angular.module('app').directive('ocfcPopover', function () {
	return{
		restrict: 'A',
		controller: function ($scope, AuthSvc, IdentitySvc, NotifierSvc) {
			alert("ocfcPopover directive is working");

		}
	};
});