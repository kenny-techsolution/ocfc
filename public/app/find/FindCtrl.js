angular.module('app').controller('FindCtrl', function ($scope,$http,$location,GoogleMapPlacesSvc, GoogleMapGeocoderSvc, google, FellowshipSvc) {
	$scope.userAddress="";
	$scope.matchedAddresses = [];
	$scope.resultLatlng= {};
	$scope.lat= 0;
	$scope.lng= 0;
	$scope.fellowships = [];
	$scope.latlngs = [];
	$scope.$watch('userAddress', function(newVal, oldVal){
		if(!newVal) return;
		console.log(newVal);
		GoogleMapPlacesSvc.getQueryPredictions({ input: newVal },function(data){
			//$scope.matchedAddresses = data;
			console.log($scope.matchedAddresses.length);
			console.log(data);
		});

	});

	$scope.getLatlng = function(address){
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

			$scope.fellowships = FellowshipSvc.query({lat:$scope.lat,lng: $scope.lng,maxDistance: 20 },function () {
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



});