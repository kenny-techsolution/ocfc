angular.module('app').controller('SettingCtrl', function ($scope, $http,IdentitySvc,UserApiSvc) {
	$scope.oldPassword;
	$scope.newPassword;
	$scope.fullName;
	$scope.email;
	$scope.selectedYear;
	$scope.selectedMonth;
	$scope.selectedDay;
	$scope.disableFullName=true;
	$scope.disableEmail=true;

	//Get user info & populate it on the input fields
	var currentUser=IdentitySvc.currentUser;
	console.log('chk currentUser obj');
	console.log(currentUser);

	$scope.fullName=currentUser.fullName;
	$scope.email=currentUser.userName;

	$scope.selectedMonths=[{value:'Month',text:'Month'},
		{value:'January',text:'January'},
		{value:'Febuary',text:'Febuary'},
		{value:'March',text:'March'},
		{value:'April',text:'April'},
		{value:'May',text:'May'},
		{value:'June',text:'June'},
		{value:'July',text:'July'},
		{value:'August',text:'August'},
		{value:'September',text:'September'},
		{value:'October',text:'October'},
		{value:'November',text:'November'},
		{value:'December',text:'December'}];

	$scope.selectedDays=[{value:'Day',text:'Day'},
		{value:'01',text:'01'},
		{value:'02',text:'02'},
		{value:'02',text:'02'},
		{value:'03',text:'03'},
		{value:'04',text:'04'},
		{value:'05',text:'05'},
		{value:'05',text:'06'},
		{value:'07',text:'07'},
		{value:'08',text:'08'},
		{value:'09',text:'09'},
		{value:'10',text:'10'},
		{value:'11',text:'11'},
		{value:'12',text:'12'},
		{value:'13',text:'13'},
		{value:'14',text:'14'},
		{value:'15',text:'15'},
		{value:'16',text:'16'},
		{value:'17',text:'17'},
		{value:'18',text:'18'},
		{value:'19',text:'19'},
		{value:'20',text:'20'},
		{value:'21',text:'21'},
		{value:'22',text:'22'},
		{value:'23',text:'23'},
		{value:'24',text:'24'},
		{value:'25',text:'25'},
		{value:'26',text:'26'},
		{value:'27',text:'27'},
		{value:'28',text:'28'},
		{value:'29',text:'29'},
		{value:'30',text:'30'},
		{value:'31',text:'31'}
	];

	$scope.selectedYears=[{value:'Year',text:'Year'},
		{value:'2015',text:'2015'},
		{value:'2014',text:'2014'},
		{value:'2013',text:'2013'},
		{value:'2012',text:'2012'},
		{value:'2011',text:'2011'},
		{value:'2010',text:'2010'},
		{value:'2009',text:'2009'},
		{value:'2008',text:'2008'},
		{value:'2007',text:'2007'},
		{value:'2006',text:'2006'},
		{value:'2005',text:'2005'},
		{value:'2004',text:'2004'},
		{value:'2003',text:'2003'},
		{value:'2002',text:'2002'},
		{value:'2001',text:'2001'},
		{value:'2000',text:'2000'},
		{value:'1999',text:'1999'}
	];



	//$watch function used to enable UPDATE button
	//only if there are difference in values against
	//User dataset
	$scope.$watch('fullName',function(newVal){
		if(newVal === currentUser.fullName){
			$scope.disableFullName=true;
		}else{
			$scope.disableFullName=false;
		}
	});

	$scope.$watch('email',function(newVal){
		if(newVal === currentUser.userName){
			$scope.disableEmail=true;
		}else{
			$scope.disableEmail=false;
		}
	});

	//Set Ng-Click on UPDATE button & assign to updateUser API call
	$scope.updateUser = function() {
		var user=new UserApiSvc();
		user.fullName=$scope.fullName;
		user.userName=$scope.email;

		UserApiSvc.update(
			{id: currentUser._id}
			, user
		);
	};

	$scope.updateUserPassword = function() {
		$http.put('/api/updatePassword',{oldPassword:$scope.oldPassword,newPassword:$scope.newPassword}).success(function(){
			console.log('front-end updateUserPassword call successful');
		}).error(function(){
			console.log('front-end updateUserPassword call failed');
		})
	}
});