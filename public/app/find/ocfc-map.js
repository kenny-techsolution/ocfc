//Close Popover when Clicking Outside
angular.module('app').directive('ocfcMap', function (L) {
	return{
		restrict: 'EA',
		scope: {
			latlngs: "=",
			fellowships: "=",
			selected: '='
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

				map = new L.Map(attrs.id, {
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
			/*
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
			*/
			$scope.markers = [];
			$scope.$watchCollection("fellowships", function(newVal){
				if(!newVal||newVal.length==0) return;
				console.log(";ajsdf;lkasjdfl;kasjdf;lkasjdfl;kasjdf");
				for(var i=0; i<newVal.length; i++) {
					console.log(newVal[i]);
					console.log(newVal[i].name);
					var marker = L.marker(newVal[i].geo).bindPopup('<h5>'+newVal[i].name+ '</h5><div>'+newVal[i].address+'</div>')
						.addTo($scope.map);
					$scope.markers.push(marker);
				}
				console.log("$scope.markers");
				console.log($scope.markers);
				var bounds = L.featureGroup($scope.markers).addTo($scope.map).getBounds();
				$scope.map.fitBounds(bounds);
			});
			$scope.$watch('selected', function(newVal){
				if(newVal==-1) return;
				console.log("testsetset");
				console.log(newVal);
				$scope.markers[newVal].openPopup();
			});
		}
	};
});