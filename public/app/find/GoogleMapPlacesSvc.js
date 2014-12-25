angular.module('app').factory('GoogleMapPlacesSvc', function ($http, google) {
	return new google.maps.places.AutocompleteService();
});
