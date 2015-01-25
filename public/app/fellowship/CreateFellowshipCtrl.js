/*******************************************************************************
 ******************************************************************************/

angular.module('app').controller('CreateFellowshipCtrl', function ($http, $scope,
                                                             IdentitySvc, FellowshipApiSvc,FellowshipUserApiSvc, $routeParams,
                                                             mySocket, $timeout, GoogleMapGeocoderSvc) {
	$scope.agree = false;
	$scope.fellowshipName;
	$scope.churchName;
	$scope.street='';
	$scope.city='';
	$scope.state='';
	$scope.zipcode='';
	$scope.country='';
	$scope.phone;
	$scope.aboutFellowship;
	$scope.isValidAddress = false;
	$scope.isNotValidAddress = false;
	$scope.latlngs = [];
	$scope.validatedBefore = false;
	$scope.revalidationNeeded = false;

	$scope.addressChange = function (){
		console.log("adddress change");
		if($scope.validatedBefore=== true) {
			console.log($scope.validatedBefore);
			console.log($scope.revalidationNeeded );
			$scope.revalidationNeeded = true;
		}
	};

	$scope.createFellowship=function(){
		console.log('front-end createFellowship is being called');
		var fellowship=new FellowshipApiSvc({name:$scope.fellowshipName,
										  address:$scope.street,
										  city:$scope.city,
										  state:$scope.state,
										  country:$scope.country,
										  zipcode:$scope.zipcode,
										  phone:$scope.phone,
										  about:$scope.aboutFellowship});

		fellowship.$save();
		//TODO need to link Fellowship to it's associated church with $scope.churchName
	};


	$scope.validateAddress = function(){

	};

	$scope.disableValidateButton = function(){
		var enable  = ($scope.street.trim() !=="")
			&& ($scope.city.trim() !=="")
			&& ($scope.state.trim() !=="")
			&& ($scope.zipcode.trim() !=="")
			&& ($scope.country.trim() !=="");
		return !enable;
	};

	//TODO after user validate the address, if user change address again, then revalidation is needed.
	$scope.validateFellowshipAddress = function(){
		var address = $scope.street + ',' + $scope.city  + ',' + $scope.state  + ',' + $scope.zipcode + ',' + $scope.country;
		console.log("vadliate fellowship address");
		console.log(address);
		GoogleMapGeocoderSvc.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var resultLatlng = results[0].geometry.location;
				$scope.latlng = [resultLatlng.lat(), resultLatlng.lng()];
				$scope.$apply(function(){
					$scope.isValidAddress = true;
					$scope.latlngs = [$scope.latlng];
					$scope.validatedBefore= true;
					$scope.revalidationNeeded = false;
				});
				console.log("validated");
			} else {
				$scope.$apply(function(){
					$scope.isNotValidAddress = true;
					$scope.latlngs = [];
				});
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	};

});

