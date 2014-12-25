//Close Popover when Clicking Outside
angular.module('app').directive('ocfcMap', function (L) {
	return{
		restrict: 'EA',
		scope: {
			latlngs: "="
		},
		replace: true,
		templateUrl: "/partials/find/ocfc-map",
		link: function(scope, element, attrs){
			var map;
			var ajaxRequest;
			var plotlist;
			var plotlayers=[];

			function initmap() {
				// set up the map
				map = new L.Map('map', {
				    center: [37.6087436, -122.40074319999997],
				    zoom: 13
				});

				// create the tile layer with correct attribution
				var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
				var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
				var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});


				map.setView(new L.LatLng(37.6087436, -122.40074319999997),9);
				map.addLayer(osm);
				scope.map = map;
			}

			initmap();
		},
		controller: function ($scope) {
			$scope.markers = [];
			$scope.$watchCollection("latlngs", function(newVal){
				if(!newVal||newVal.length==0) return;
				$scope.markers = [];
				for(var i=0; i<newVal.length; i++) {
					var marker = L.marker(newVal[i]).addTo($scope.map);
					$scope.markers.push(marker);
				}
				console.log("$scope.markers");
				console.log($scope.markers);
				var bounds = L.featureGroup($scope.markers).addTo($scope.map).getBounds();
				$scope.map.fitBounds(bounds);
			});
		}
	};
});