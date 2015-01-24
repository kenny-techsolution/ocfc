//Close Popover when Clicking Outside
angular.module('app').directive('ocfcPopover', function () {
	return{
		restrict: 'A',
		controller: function () {
			alert("ocfcPopover directive is working");
		}
	};
});