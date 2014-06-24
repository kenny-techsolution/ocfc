//6.23.2014, create directive for filter bar
angular.module('app').directive('ocfcFilterBar',function(){
	return{
		restrict:'E',
		$scope:true,
		templateUrl:'/partials/fellowship/ocfc-filter-bar',
		controller:function($scope, $http, IdentitySvc, FellowMemSvc) {
			// function()() is a self triggered function
			// no calling required
			$scope.associatedFellowships;
			$scope.fellowships;
			$scope.zipcode = '';

			// this function will set the associatedFellowships array,
			// which is the list of fellowships associated with the current user.
			$scope.getAssociatedFellowships = (function() {
				// check if the current user is authenticated
				if (IdentitySvc.isAuthenticated() === true) {
					$scope.associatedFellowships = FellowMemSvc.query({
						userId: IdentitySvc.currentUser._id
					}, function() {
						$scope.loadFellows();
					});
				}
			}());


			// this function will update the fellowships array,binded to our view,
			// by checking the zipcode string user typed in.
			$scope.updateFellowListByZip = function() {
				if ($scope.zipcode.length == 5) {
					$scope.loadFellows({
						params: {
							zip: $scope.zipcode
						}
					});
				}
			};

			// this function will interact with the server to let user join the
			// selectedFellowship.
			$scope.joinFellowship = function(fellowship) {
				var fellowMemData = {
					"userId": IdentitySvc.currentUser._id,
					"fellowId": fellowship._id
				};
				var newFellowMem = new FellowMemSvc(fellowMemData);
				newFellowMem.$save().then(function(response) {
					//after save, set the status of Join Fellowship to Pending
					fellowship.status='Pending';
					console.log("fasdfasdfasdf response");
					fellowship.fellowMemId = response.fellowMemId;
					console.log(response);
				});
			};

			// 4.30.2014
			// this function interacts with server to approve the user for the
			// fellowship.
			$scope.approveFellowship = function(fellowship) {
				console.log('test fellowship');
				console.log(fellowship);
				// we need to get the fellowMem document that we want to update.
				// GET is asyncronized

				//below parameter is a callback, 1st parameter must be met
				var fellowMem = FellowMemSvc.get(
					{_id: fellowship.fellowMemId}
					,function() {
						fellowMem.status = 'Approved';

						//update server with fellowMem data on the front end
						FellowMemSvc.update({
							_id: fellowMem._id
						}, fellowMem,function(){
							fellowship.status='Approved';
						});
					}

				);

			};

			// 5.3.2014
			// this function interacts with server to cancel the user for the
			// fellowship when under Pending status
			$scope.cancelFellowship = function(fellowship) {
				// we need to get the fellowMem document that we want to update.
				// GET is asyncronized
				var fellowMem = FellowMemSvc.get(
					{
						_id: fellowship.fellowMemId}
					//below parameter is a callback, 1st parameter must be met
					,function() {
						fellowMem.status = 'None';

						//update server with fellowMem data on the front end
						FellowMemSvc.update({
							_id: fellowMem._id
						}, fellowMem,function(){
							fellowship.status='None';
						});
					}

				);

			};

			// this function interact with server to load all the fellowships,
			// and add a status field to each fellowship by checking against the
			// associatedFellowship array.
			$scope.loadFellows = function(params) {
				var params = $.extend({
					url: '/api/fellows',
					method: 'GET'
				}, params);

				$http(params).success(function(data) {
					angular.forEach(data, function(fellowObj, key) {
						var norun = false;
						if ($scope.associatedFellowships.length !== 0) {
							angular.forEach($scope.associatedFellowships, function(fellowMemObj, key) {
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
					$scope.fellowships = data;
				});
			};
		}
	};
});