//This file references all module required for this project
//Defining a model called 'app' which uses directives listed within []
angular.module('app',['ngResource','ngRoute','lr.upload', 'ui.bootstrap']);


//4.29.2014, updated code to include churchAdmin and worldAdmin authorization
angular.module('app').config(function($routeProvider,$locationProvider){

    var routeRoleChecks={
        admin:{auth: function(mvAuth){
            var admin=mvAuth.authorizedCurrentUserForRoute('admin');
            console.log("Test for different admin privileges");
            console.log(admin);
            console.log(churchAdmin);
            console.log(worldAdmin);
            var pass = (admin===true);
            console.log(pass);
            return pass;

        }},
        user:{auth: function(mvAuth){
            return mvAuth.authorizedAuthenticatedUserForRoute();
        }},

        fellowAdmin:{auth:function(){
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
    $routeProvider.when('/',{templateUrl:'/partials/main/main',controller:'mvMainCtrl'})
        .when('/admin/users',{templateUrl:'/partials/admin/user-list',controller:'mvUserListCtrl',resolve: routeRoleChecks.admin})
        .when('/signup',{templateUrl:'/partials/account/signup',controller:'mvSignupCtrl'})
        .when('/profile',{templateUrl:'/partials/account/profile',controller:'mvProfileCtrl',resolve:routeRoleChecks.user})
        .when('/courses',{templateUrl:'/partials/courses/course-list',controller:'mvCourseListCtrl'})
        .when('/courses/:id',{templateUrl:'/partials/courses/course-details',controller:'mvCourseDetailCtrl'})
        .when('/joinFellow',{templateUrl:'/partials/fellowship/join-fellow',controller:'mvJoinFellowCtrl'})
        .when('/fellowship/:id',{templateUrl:'/partials/fellowship/fellowship',controller:'mvFellowshipCtrl'})
        .when('/fellowshipMembers/:id',{templateUrl:'/partials/fellowship/member',controller:'mvMemberCtrl'})
        .when('/createFellow/',{templateUrl:'/partials/fellowship/create-fellow',controller:'mvCreateFellowCtrl'})
        .when('/ocfcAdmin/',{templateUrl:'/partials/fellowship/ocfc-admin',controller:'mvApprvFellowCtrl'});
});

//execute after above code to re-route path after rejection
//if user is not authorized then will re-direct to Home page
angular.module('app').run(function($rootScope,$location){
    $rootScope.$on('$routeChangeError',function(evt,current,previous,rejection){
        if(rejection==='not authorized'){
            $location.path('/');
        }
    });
});


//Common Functions used on the Client Slide are defined here
var cl = function (title, value) {
    console.log(title);
    console.log(value);
};
