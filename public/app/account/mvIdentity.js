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

 factory or service are used as single copy known as singleton
 factory returns objects
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

        },
        isAuthorized: function(role){
            return !!this.currentUser && this.currentUser.roles.indexOf(role)>-1;

        }
    }
});