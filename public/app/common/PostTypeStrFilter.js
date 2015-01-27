angular.module('app').filter('PostTypeStrFilter', function () {
	//console.log('front-end PostTypeStrFilter has been called');

	// rest api standard, for GET, if id is specified, it will grab specific
	//var postTypeArray = ['general','testimony','question','prayer','event'];
	return function (input) {
		var output;
		if (input === 0) {
			output = 'General';
		} else if (input === 1) {
			output = 'Testimony';
		} else if (input === 2) {
			output = 'Question';
		} else if (input === 3) {
			output = 'Prayer';
		} else if (input === 4) {
			output = 'Event';
		} else if (input === 5) {
			output = 'Announcement';
		}
		return output;
	};
});