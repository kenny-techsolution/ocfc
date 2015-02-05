//This file references all module required for this project
//Defining a model called 'app' which uses directives listed within []
//'ui.bootstrap'
angular.module('app',['ngResource','ngRoute','ngAnimate','ui.bootstrap','mgcrea.ngStrap','btford.socket-io','cloudinary','angularFileUpload','infinite-scroll']).
factory('mySocket', function (socketFactory) {
	return socketFactory();
	}).factory('_', function() {
		return window._;// assumes underscore has already been loaded on the page
	}).factory('google', function(){
		return window.google;
	}).factory('L', function(){
		return window.L;
	}).filter('capitalize', function() {
		return function(input, all) {
			return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
	    };
	});;

//must move above factory into a separate service during refactoring

//4.29.2014, updated code to include churchAdmin and worldAdmin authorization
angular.module('app').config(function ($routeProvider, $locationProvider, $httpProvider) {

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


	var checkLogin = function(IdentitySvc, $q, $location){
			var defer = $q.defer();
			if(IdentitySvc.isAuthenticated()){
				 defer.resolve('logged in');
			} else {
				defer.reject('logged out');
				$location.path("/");
			}
			return defer.promise;
	};

	var forbidSignup = function(IdentitySvc, $q, $location){
		var defer = $q.defer();
		if(!IdentitySvc.isAuthenticated()){
			console.log("not login");
			 defer.resolve('logged out');
		} else {
			console.log("already login");
			defer.reject('logged in');
			$location.path("/fellowship/54a0f90799b81bbbb99a00ce");
		}
		return defer.promise;
	};
//4.29.2014, updated code to include churchAdmin and worldAdmin authorization ends

	//The links below will update the body section of the website based on the links being called below
	//Front end will call '/partials/main/main' to server
	//routes.js will render the it to the correct template based on it's callback
	//Hijacks, changes data w/o going to server, only change on the front end
	//4.29.2014, updated code to include churchAdmin and worldAdmin
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {templateUrl: '/partials/account/access/landing-page', controller: 'SignupCtrl',resolve:{ forbidSignup: forbidSignup}})
		.when('/activate/:activateCode/userId/:id/email/:email', {templateUrl: '/partials/account/activate', controller: 'ActivateCtrl'})
		.when('/firstTimer', {templateUrl: '/partials/firstTimer/first-timer', controller: 'firstTimerCtrl',resolve: { checklogin: checkLogin}})
		.when('/setting', {templateUrl: '/partials/account/setting/setting', controller: 'SettingCtrl'})
		.when('/createFellowship', {templateUrl: '/partials/fellowship/create-fellowship', controller: 'CreateFellowshipCtrl'})
		.when('/approveFellowship', {templateUrl: '/partials/fellowship/approve-fellowship', controller: 'ApproveFellowshipCtrl',resolve: { checklogin: checkLogin}})
		.when('/createChurch', {templateUrl: '/partials/church/create-church', controller: 'ChurchCtrl',resolve: { checklogin: checkLogin}})
		.when('/approveChurch', {templateUrl: '/partials/church/approve-church', controller: 'ChurchCtrl',resolve: { checklogin: checkLogin}})
		.when('/fellowship/:id/members', {templateUrl: '/partials/fellowship/fellowship-members', controller: 'FellowshipMembersCtrl'})
		.when('/fellowship/:id', {templateUrl: '/partials/fellowship/fellowship', controller: 'FellowshipCtrl',resolve: { checklogin: checkLogin}})
		.when('/fellowship2/:id', {templateUrl: '/partials/fellowship/fellowship2', controller: 'FellowshipCtrl',resolve: { checklogin: checkLogin}})
		.when('/church/:id', {templateUrl: '/partials/church/church', controller: 'ChurchCtrl'})
		.when('/find', {templateUrl: '/partials/find/find', controller: 'FindCtrl'})
		.when('/fellowship/:id/albums', {templateUrl: '/partials/album/albums', controller: 'AlbumsCtrl'})
		.when('/registrationComplete', {templateUrl: '/partials/account/registration-complete', controller: 'RegistrationCompleteCtrl'})
		.when('/dummy', {templateUrl: '/partials/common/dummy', controller: 'DummyCtrl'});


		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

});

//execute after above code to re-route path after rejection
//if user is not authorized then will re-direct to Home page
angular.module('app').run(function ($route, $rootScope, $location) {
/*
	$rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/', false);
		}
	});
*/
});

//Common Functions used on the Client Slide are defined here
var cl = function (title, value) {
	console.log(title);
	console.log(value);
};

