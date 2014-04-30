/*************************************************************************************
 This file creates a new Directive called mvIdentity
 which injects $window and mvUser.js
        mvUser.js: look up records containing 'admin' on Mongo db

 Object currentUser is created, if records exist then the code will extend to
 currentUser.jade
        currentUser.jade: converts db record into JSON format

 currentUser, isAuthenticated and isAuthorized values will be returned

    currentUser: equals mvUser() function in mvUser.js
    isAuthenticated: returns currentUser info
    isAuthorized: returns currentUser and checks for 'admin' role access
 ***************************************************************************************/
angular.module('app').factory('mvIdentity',function($window, mvUser){
    var currentUser;
    if(!!$window.bootstrappedUserObject){
        currentUser=new mvUser();
        angular.extend(currentUser,$window.bootstrappedUserObject);
    }
    return{
        currentUser:currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
            console.log("checks !!this.currentUser isAuthenticated");
            console.log(!!this.currentUser);
        },
        isAuthorized: function(role){
            return !!this.currentUser && this.currentUser.roles.indexOf(role)>-1;
            console.log("checks !!this.currentUser && this.currentUser.roles.indexOf(role)>-1 isAuthorized");
            console.log(this.currentUser);
            console.log(this.currentUser.roles.indexOf(role));
        }
    }
});