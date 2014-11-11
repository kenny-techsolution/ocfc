/*************************************************************************************
 This file creates a new Service called AuthSvc
 which will authenticate username & password info.

 Its takes in 4 injections ($http,IdentitySvc, $q and UserSvc)

 Creates 2 objects (authenticateUser & logoutUser)
 authenticateUser:  A function that injects username & password.
 It uses $http directive to check if users exist.
 If true then code will extend to UserSvc.js

 createUser:         A function that injects newUserData object which contains
 password, username, firstName and LastName into UserSvc.js
 called user.
 user object is then set as IdentitySvc.currentUser.

 update currentUser: Clones data from IdentitySvc.currentUser and extending from newUserData

 logoutUser: Uses $http directive to check if user has logged out

 authorizedCurrentUserForRoute:  Checks if isAuthorized(role) is true in IdentitySvc.js

 authorizedAuthenticatedUserForRoute: Check if isAuthenticated is true in IdentitySvc.js
 ***************************************************************************************/
angular.module('app').factory('AuthSvc',function($http,IdentitySvc,$q,UserSvc){
    return{
	    //Updates data by calling $http post service
	    //Also adding response data with extend method
        authenticateUser: function(username,password){
            var dfd=$q.defer();
            $http.post('/login',{username:username, password:password}).then(function(response){
                if(response.data.success){
                    var user=new UserSvc();
                    angular.extend(user,response.data.user);
	                IdentitySvc.currentUser=user;
	                console.log("oosjdofijasodifjasdf");
	                console.log(IdentitySvc.currentUser.isAdmin());
                    dfd.resolve(true);
                } else{
                    dfd.resolve(false);

                }
            });
            return dfd.promise;
        },
        createUser: function(newUserData){
	        //newUserData contains data fields for signup
	        //newUser creates new instance of UserSvc service resource
            var newUser= new UserSvc(newUserData);
            var dfd=$q.defer();

            newUser.$save().then(function(){
	            //Save & pass newUser data to IdentitySvc.currentUser
	            IdentitySvc.currentUser=newUser;
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        updateCurrentUser: function(newUserData){
            var dfd=$q.defer();

            var clone=angular.copy(IdentitySvc.currentUser);
            angular.extend(clone,newUserData);
            clone.$update().then(function(){
	            IdentitySvc.currentUser=clone;
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        logoutUser: function(){
            var dfd=$q.defer();
            $http.post('/logout',{logout:true}).then(function(){
	            IdentitySvc.currentUser=undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizedCurrentUserForRoute: function(role){
            if(IdentitySvc.isAuthorized(role)){
                console.log("IdentitySvc.isAuthorized(role) returned as TRUE in AuthSvc");
                return true;
            }else{
                return $q.reject('not authorized');
            }
        },
        authorizedAuthenticatedUserForRoute: function(){
            if(IdentitySvc.isAuthenticated()){
                console.log("IdentitySvc.isAuthenticated() returned as TRUE in AuthSvc");
                return true;
            }else{
                return $q.reject('not authenticated');
            }
        }
    }
});