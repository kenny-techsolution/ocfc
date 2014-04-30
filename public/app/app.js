//This file references all module required for this project
//Defining a model called 'app' which uses directives listed within []
angular.module('app',['ngResource','ngRoute']);

//Need explaining on this code
//4.29.2014, updated code to include churchAdmin and worldAdmin authorization
angular.module('app').config(function($routeProvider,$locationProvider){
    var routeRoleChecks={
        admin:{auth: function(mvAuth){
            return mvAuth.authorizedCurrentUserForRoute('admin');
        }},
        churchAdmin:{auth: function(mvAuth){
            return mvAuth.authorizedCurrentUserForRoute('churchAdmin');
        }},
        worldAdmin:{auth: function(mvAuth){
            return mvAuth.authorizedCurrentUserForRoute('worldAdmin');
        }},
        user:{auth: function(mvAuth){
            return mvAuth.authorizedAuthenticatedUserForRoute();
        }}
    };
    //Front end will call '/partials/main/main' to server
    //routes.js will render the it to the correct template based on it's callback
    //Hijacks, changes data w/o going to server, only change on the front end
    //4.29.2014, updated code to include churchAdmin and worldAdmin
    $locationProvider.html5Mode(true);
    $routeProvider.when('/',{templateUrl:'/partials/main/main',controller:'mvMainCtrl'})
        .when('/admin/users',{templateUrl:'/partials/admin/user-list',controller:'mvUserListCtrl',resolve: routeRoleChecks.admin})
        .when('/admin/users',{templateUrl:'/partials/admin/user-list',controller:'mvUserListCtrl',resolve: routeRoleChecks.churchAdmin})
        .when('/admin/users',{templateUrl:'/partials/admin/user-list',controller:'mvUserListCtrl',resolve: routeRoleChecks.worldAdmin})
        .when('/signup',{templateUrl:'/partials/account/signup',controller:'mvSignupCtrl'})
        .when('/profile',{templateUrl:'/partials/account/profile',controller:'mvProfileCtrl',resolve:routeRoleChecks.user})
        .when('/courses',{templateUrl:'/partials/courses/course-list',controller:'mvCourseListCtrl'})
        .when('/courses/:id',{templateUrl:'/partials/courses/course-details',controller:'mvCourseDetailCtrl'});
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




