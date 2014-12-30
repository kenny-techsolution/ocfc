/*******************************************************************************
 ******************************************************************************/

angular.module('app').controller('FellowshipCtrl', function (FellowshipDataSvc,$routeParams) {

	//include FellowshipDataSvc which captures all data needed for Fellowship widgets
	$scope.FellowshipDataSvc=FellowshipDataSvc;
	$scope.FellowshipDataSvc.initialize($routeParams.id);

});

