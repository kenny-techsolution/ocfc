angular.module('app').controller('MemberCtrl', function($scope, FellowMemSvc,$routeParams,
                                                        NotifierSvc,IdentitySvc) {
    $scope.members =[];
    $scope.modalMemberIndex;

	$scope.IdentitySvc =IdentitySvc;

	//$scope.filterMemByRole returns true for "non-admin" users
	$scope.filterMemByRole = function(member)
	{
		if(member.status=="Approved"){
			if (member.roles.length==0){
				return true; //approve for non-admin user
			}else{
				for(var i=0;i<member.roles.length;i++) {
					if (member.roles[i].indexOf('admin') === -1) {
						return true; // this will be listed in the results
					} else {
						return false; // otherwise it won't be within the results
					}
				};
			};
		} else {
			return false;
		}

	};

	//$scope.filterAdminByRole returns true for "admin" users
	$scope.filterAdminByRole = function(member)
	{
		for(var i=0;i<member.roles.length;i++){
			if(member.roles[i].indexOf('admin')>-1)
			{
				return true; // this will be listed in the results
			}
			return false; // otherwise it won't be within the results
		};

	};

	//$scope.filterMemByStatus returns true for "Pending" statues
	$scope.filterMemByStatus = function(member)
	{
		for(var i=0;i<member.status.length;i++){
			if(member.status.indexOf('Pending')>-1)
			{
				return true; // this will be listed in the results
			}
			return false; // otherwise it won't be within the results
		};
	};


	//$scope.fellowMems contains members associated to a fellowship
	//Then, assigns retrieved data onto $scope.members array object
    $scope.fellowMems = FellowMemSvc.query(
        {
            fellowshipId: $routeParams.id}
        //below parameter is a callback, 1st parameter must be met
        ,function() {
            console.log("chk $scope.fellowMems query array object");
            console.log($scope.fellowMems);
            angular.forEach($scope.fellowMems, function(fellowMem, key) {
                fellowMem.member.status=fellowMem.status;
                fellowMem.member.fellowMemId=fellowMem._id;

	            //Assign data into $scope.members array object
                $scope.members.push(fellowMem.member);
	            console.log('chk $scope.members');
	            console.log($scope.members);
            });
        }
    );

    // 4.30.2014
    // $scope.approveMember contains a member that needs approval
    $scope.approveMember = function(member) {
        // GET is asyncronized
        var fellowMem = FellowMemSvc.get(
	        {_id: member.fellowMemId}
	        // Below function is a callback where 1st parameter must be met
	        , function() {
		        //Must have Admin privilege
		        if (IdentitySvc.currentUser.isAdmin()){
			        fellowMem.status = 'Approved';
			        //update server with fellowMem data on the front end
			        FellowMemSvc.update({
				        _id: fellowMem._id
			        }, fellowMem, function () {
				        member.status = 'Approved';
				        console.log('chk fellowMem array');
				        console.log(fellowMem);
			        });
		        }else{
			        NotifierSvc.notify('You do have admin right to approve');
		        };
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