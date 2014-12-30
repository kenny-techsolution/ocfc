/*******************************************************************************
 ******************************************************************************/

angular.module('app').controller('FellowshipCtrl', function ($scope,FellowshipDataSvc,$routeParams) {

	//include FellowshipDataSvc which captures all data needed for Fellowship widgets
	console.log("controller  kdfj;lakdjfl;askdjf;aklsj");
	$scope.FellowshipDataSvc=FellowshipDataSvc;
	$scope.FellowshipDataSvc.initialize($routeParams.id);

});

