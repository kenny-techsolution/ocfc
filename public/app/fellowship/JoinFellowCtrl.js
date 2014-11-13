/*******************************************************************************
 * This file creates a new Controller called JoinFellowCtrl. The code stores
 * all records into JoinFellowCtrl controller. The controller checks zipcode
 * input text of no more than 5 length chars creates a objects called:
 * updateFellowList: once the condition is met, $http directive will retrieve
 * the data from mongodb of fellowships collection associatedFellowships: get or
 * read all the associated fellowships for the current user. selectedFellowship:
 * set as null joinFellowship: add userId and fellowId onto fellowMems
 * collection fellowMemResource: Takes rest /api/fellowMems/:id using GET method
 * to grab records for specific user
 ******************************************************************************/
angular.module('app').controller('JoinFellowCtrl', function ($scope, $http, IdentitySvc, FellowshipSvc, FellowMemSvc, IdentitySvc, NotifierSvc) {
	// function()() is a self triggered function
	// no calling required

	$scope.associatedFellowships;
	$scope.fellowships;
	$scope.zipcode = '';

	// This function interact with server to load all the fellowships,
	// $scope.loadFellows contains the latest data object filtered by params
	// and update fields statues to each fellowship
	$scope.loadFellows = function (params) {
		//Calls getFellows service
		FellowshipSvc.getFellows(params).success(function (data) {
			//Loop data
			angular.forEach(data, function (fellowObj, key) {
				var norun = false;
				if ($scope.associatedFellowships.length !== 0) {
					//Update fellowMemObj fields onto fellowObj
					angular.forEach($scope.associatedFellowships, function (fellowMemObj, key) {
						if (norun == false) {
							if (fellowObj._id == fellowMemObj.fellowship) {
								fellowObj.status = fellowMemObj.status;
								fellowObj.fellowMemId = fellowMemObj._id;
								norun = true;
							} else {
								fellowObj.status = 'None';
							}
						}
					});
				} else {
					fellowObj.status = 'None';
				}
			});
			//Initialize latest data object filtered by params onto $scope.fellowships
			$scope.fellowships = data;
		});
	};

	// Function does a service call to retrieve list of
	// fellowship group associated to a user onto $scope.getAssociatedFellowships
	$scope.getAssociatedFellowships = (function () {
		// check if the current user is authenticated
		if (IdentitySvc.isAuthenticated() === true) {
			$scope.associatedFellowships = FellowMemSvc.query({
				userId: IdentitySvc.currentUser._id
			}, function () {
				$scope.loadFellows();
			});
		}
	}());

	// $scope.updateFellowListByZip, search and load fellowships by zip code
	$scope.updateFellowListByZip = function () {
		if ($scope.zipcode.length == 5) {
			$scope.loadFellows({
				params: {
					zip: $scope.zipcode
				}
			});
		}
	};

	// This function will interact with the server
	// $scope.joinFellowship retrieves latest data from server
	// then assign fields onto fellowship object
	$scope.joinFellowship = function (fellowship) {
		var fellowMemData = {
			"userId": IdentitySvc.currentUser._id,
			"fellowId": fellowship._id
		};
		//Service call that passes fellowMemData object
		var newFellowMem = new FellowMemSvc(fellowMemData);
		newFellowMem.$save().then(function (response) {
			//After save, set the status of Join Fellowship to Pending
			fellowship.status = 'Pending';
			fellowship.fellowMemId = response.fellowMemId;
		});
	};

	// 4.30.2014
	// This function interacts with server to approve the user for the
	// fellowship.
	$scope.approveFellowship = function (fellowship) {
		// We need to get the fellowMem document that we want to update.
		// GET is asyncronized

		//Service call to grab all members associated to a fellowship
		var fellowMem = FellowMemSvc.get(
			{_id: fellowship.fellowMemId}
			// Below function is a callback where 1st parameter must be met
			, function () {
				//Must have Admin privilege
				if (IdentitySvc.currentUser.isAdmin()) {
					fellowMem.status = 'Approved';

					//update server with fellowMem data on the front end
					FellowMemSvc.update({
						_id: fellowMem._id
					}, fellowMem, function () {
						fellowship.status = 'Approved';
					});
				} else {
					NotifierSvc.notify('You do have admin right to approve');
				}
				;
			}
		);

	};

	// 5.3.2014
	// This function interacts with server to cancel the user for the
	// fellowship when under Pending status
	// $scope.cancelFellowship contains data where statues
	// have been reverted back to original state
	$scope.cancelFellowship = function (fellowship) {
		// we need to get the fellowMem document that we want to update.
		// GET is asyncronized
		var fellowMem = FellowMemSvc.get(
			{
				_id: fellowship.fellowMemId}
			//below parameter is a callback, 1st parameter must be met
			, function () {
				fellowMem.status = 'None';

				//update server with fellowMem data on the front end
				FellowMemSvc.update({
					_id: fellowMem._id
				}, fellowMem, function () {
					fellowship.status = 'None';
				});
			}
		);

	};
});