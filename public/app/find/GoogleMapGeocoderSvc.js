angular.module('app').factory('GoogleMapGeocoderSvc', function ($http, google) {
	return new google.maps.Geocoder();
});
