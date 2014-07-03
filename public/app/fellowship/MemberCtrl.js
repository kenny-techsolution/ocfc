angular.module('app').controller('MemberCtrl', function($scope, FellowMemSvc,$routeParams, NotifierSvc) {
    $scope.members =[];
    $scope.modalMemberIndex;
    $scope.fellowMems = FellowMemSvc.query(
        {
            fellowshipId: $routeParams.id}
        //below parameter is a callback, 1st parameter must be met
        ,function() {
            console.log("$scope.fellowMems[i]");
            console.log($scope.fellowMems);
            angular.forEach($scope.fellowMems, function(fellowMem, key) {
                fellowMem.member.status=fellowMem.status;
                fellowMem.member.fellowMemId=fellowMem._id;
                $scope.members.push(fellowMem.member);
            });
        }

    );

    // 4.30.2014
    // this function interacts with server to approve the user for the
    // fellowship.
    $scope.approveMember = function(member) {
        console.log('test member');
        console.log(member);
        // we need to get the fellowMem document that we want to update.
        // GET is asyncronized

        //below parameter is a callback, 1st parameter must be met
        var fellowMem = FellowMemSvc.get(
            {_id: member.fellowMemId}
            ,function() {
                fellowMem.status = 'Approved';

                //update server with fellowMem data on the front end
                FellowMemSvc.update({
                    _id: fellowMem._id
                }, fellowMem,function(){
                    member.status='Approved';
                });
            }

        );

    };
    $scope.setModalMemberIndex = function (index) {
        $scope.modalMemberIndex = index;
    };
    // 5.7.2014
    // this function interacts with server to remove member
    $scope.removeMember = function() {
        // we need to get the fellowMem document that we want to update.
        // GET is asyncronized

        var member = $scope.members[$scope.modalMemberIndex];
//        console.log("jajajajjaj");
//        console.log($scope.modalMemberIndex);
//        console.log(member);
        //below parameter is a callback, 1st parameter must be met
        var fellowMem = FellowMemSvc.remove(
            {_id: member.fellowMemId}
            ,function(data) {
                if (data.status="success"){
                    $("#RejRemvConfirmation").modal('hide');
                    $scope.members.splice($scope.modalMemberIndex,1);
	                NotifierSvc.notify('You have successfully removed the user!');
                }else{

                };
            }

        )

    };

});