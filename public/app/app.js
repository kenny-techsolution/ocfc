//This file references all module required for this project
//Defining a model called 'app' which uses directives listed within []
angular.module('app',['ngResource','ngRoute', 'ui.bootstrap','ngAnimate','btford.socket-io','cloudinary','angularFileUpload']).
factory('mySocket', function (socketFactory) {
	return socketFactory();
	});
//must move above factory into a separate service during refactoring

//4.29.2014, updated code to include churchAdmin and worldAdmin authorization
angular.module('app').config(function ($routeProvider, $locationProvider) {

	//initialize cloudinary config
	$.cloudinary.config().cloud_name = 'ocfc';
	$.cloudinary.config().upload_preset = 'faz4z06p';

	var routeRoleChecks={
		admin:{auth: function(AuthSvc){
			var admin=AuthSvc.authorizedCurrentUserForRoute('admin');
			console.log("Test for different admin privileges");
			console.log(admin);
			console.log(churchAdmin);
			console.log(worldAdmin);
			var pass = (admin === true);
			console.log(pass);
			return pass;

		}},
		user: {auth: function (AuthSvc) {
			return AuthSvc.authorizedAuthenticatedUserForRoute();
		}},

		fellowAdmin: {auth: function () {
			return true;
		}}
	};
//4.29.2014, updated code to include churchAdmin and worldAdmin authorization ends

	//The links below will update the body section of the website based on the links being called below
	//Front end will call '/partials/main/main' to server
	//routes.js will render the it to the correct template based on it's callback
	//Hijacks, changes data w/o going to server, only change on the front end
	//4.29.2014, updated code to include churchAdmin and worldAdmin
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', {templateUrl: '/partials/main/main', controller: 'MainCtrl'})
		//12.18.2014 added
		.when('/', {templateUrl: '/partials/account/access/landing-page', controller: 'SignupCtrl'})
		.when('/signup', {templateUrl: '/partials/account/signup', controller: 'SignupCtrl'})
		.when('/signin', {templateUrl: '/partials/account/signin', controller: 'SignupCtrl'})
		.when('/profile', {templateUrl: '/partials/account/profile/profile', controller: 'ProfileCtrl', resolve: routeRoleChecks.user})
		.when('/fellowship/:id', {templateUrl: '/partials/fellowship/fellowship', controller: 'FellowshipCtrl'})
		.when('/church/:id', {templateUrl: '/partials/church/church', controller: 'ChurchCtrl'});
});

//execute after above code to re-route path after rejection
//if user is not authorized then will re-direct to Home page
angular.module('app').run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	});
});

//Common Functions used on the Client Slide are defined here
var cl = function (title, value) {
	console.log(title);
	console.log(value);
};

