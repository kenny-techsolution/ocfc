angular.module('app').controller('FindCtrl', function ($scope,$http,$location,GoogleMapPlacesSvc, GoogleMapGeocoderSvc, google, FellowshipApiSvc,FellowshipUserApiSvc,IdentitySvc) {

	$scope.selectedGroup = "FELLOWSHIP";
	$scope.groups = [{value:'FELLOWSHIP',label:'FELLOWSHIP'},{value:'CHURCH',label:'CHURCH'}];

	$scope.userAddress="";
	$scope.matchedAddresses = [];
	$scope.resultLatlng= {};
	$scope.lat= 0;
	$scope.lng= 0;
	$scope.fellowships = [];
	$scope.latlngs = [];
	$scope.showAutocomplete = false;
	$scope.isSummaryOn = false;
	$scope.currentGroup = {name:''};
	$scope.groupIndex = -1;

	$scope.getAddress = function(viewValue){
		var params = {address: viewValue, sensor: false};
	    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params})
	    .then(function(res) {
	    	console.log(res.data.results);
	      return res.data.results;
	    });
	};
	// $scope.$watch('userAddress', function(newVal, oldVal){
		// if(!newVal) return;
		// console.log(newVal);
		// GoogleMapPlacesSvc.getQueryPredictions({ input: newVal },function(data){
			// $scope.matchedAddresses = data;
			// $scope.showAutocomplete = true;
			// console.log($scope.matchedAddresses.length);
			// console.log(data);
		// });
	// });

	$scope.getLatlng = function(address){
		$scope.showAutocomplete = false;
		console.log("get address");
		console.log(address);
		GoogleMapGeocoderSvc.geocode( { 'address': address}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	      	console.log("get Geocode");
	      	$scope.resultLatlng = results[0].geometry.location;
	      	console.log($scope.resultLatlng);
	      	$scope.lat = $scope.resultLatlng.lat;
	      	$scope.$apply(function(){
	      		console.log("$scope.resultLatlng.lat");
	      		console.log($scope.resultLatlng.lat());
	      		$scope.lat = $scope.resultLatlng.lat();
	      		$scope.lng = $scope.resultLatlng.lng();
	      	});

			$scope.fellowships = FellowshipApiSvc.query({lat:$scope.lat,lng: $scope.lng,maxDistance: 200 },function () {
					console.log('chk $scope.fellowships');
					console.log($scope.fellowships);
					var latlngs = [];
					for(var i =0; i<$scope.fellowships.length; i++){
						latlngs.push($scope.fellowships[i].geo);
					}
					$scope.latlngs =latlngs;
					console.log($scope.latlngs);
				}
			);


	      } else {
	        alert("Geocode was not successful for the following reason: " + status);
	      }
	    });
	};

	$scope.openSummary = function(index, type, group){
		$scope.groupIndex = index;
		$scope.currentGroup = group;

//		console.log('chk $scope.currentGroup');
//		console.log($scope.currentGroup);

		$scope.currentGroup.type = type;
		$scope.isSummaryOn = true;
	};
	$scope.closeSummary = function(){
		$scope.isSummaryOn = false;
	};

	$scope.joinFellowship=function(fellowship){
	//ROUTE: app.post('/api/fellowships/:fellowship_id/users', fellowships.addUserToFellowship);
	//Request for the following: User ID,
		console.log('front-end joinFellowship is being called');
		var user=new FellowshipUserApiSvc({
			fellowship_id:fellowship._id,
			user_id:IdentitySvc.currentUser._id
		});

		user.$save(function(){
			console.log('$scope.joinFellowship has been called within FindCtrl');
		});

	};

});