/*************************************************************************************
 This file creates a new Controller called mvSignupCtrl
 which takes $scope, mvUser.js, mvNotifier,$location,mvAuth.js
 directives

 newUserData object is created containing username, password, firstName and LastName

 Checks data against mvAuth.js to insure data is correct
 *************** ************************************************************************/


angular.module('app').controller('mvSignupCtrl',function($scope, mvUser, mvNotifier,$location,mvAuth)
    {
        $scope.signup=function(){
            var newUserData={
                userName: $scope.email,
                password: $scope.password,
                firstName:$scope.fname,
                lastName: $scope.lname};

        mvAuth.createUser(newUserData).then(function()
            {
            mvNotifier.notify('User account created!');
            $location.path('/');
            }
            ,function(reason)
                {
                mvNotifier.error(reason);
                })
        }
    });