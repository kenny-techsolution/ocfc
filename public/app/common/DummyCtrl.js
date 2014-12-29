angular.module('app').controller('DummyCtrl', function ($http, $scope,UserSvc,ChurchSvc,
                                                         IdentitySvc, FellowshipSvc,FellowshipUserSvc, $routeParams,
                                                         mySocket, $timeout) {

var Users=[{fullName:'Mariah Carey',
	userName:'mc@gmail.com',
	birthday:new Date("October 13, 1983 11:13:00"),
	gender:'female',
	active:'true',
	signupDate:new Date("October 13, 2014 11:13:00"),
	password:'abc',
	profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture1.jpg'},
	{fullName:'Jennifer Carey',
		userName:'mc1@gmail.com',
		birthday:new Date("October 13, 1983 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture2.jpg'},
	{fullName:'George Clooney',
		userName:'gc@gmail.com',
		birthday:new Date("August 12, 1970 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("October 23, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture3.jpg'},
	{fullName:'Brad Pitt',
		userName:'bp@gmail.com',
		birthday:new Date("May 11, 1953 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("January 28, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture4.jpg'},
	{fullName:'John McAuthur',
		userName:'jmjoi@gmail.com',
		birthday:new Date("February 13, 1963 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("April 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture5.jpg'},
	{fullName:'Whitney Houston',
		userName:'wh@gmail.com',
		birthday:new Date("April 13, 1970 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("June 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture6.jpg'},
	{fullName:'Michael Jackson',
		userName:'mj@gmail.com',
		birthday:new Date("October 13, 1963 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("July 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture7.jpg'},
	{fullName:'David Pawson',
		userName:'dp@gmail.com',
		birthday:new Date("November 13, 1953 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("July 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture8.jpg'},
	{fullName:'David Tao',
		userName:'dt@gmail.com',
		birthday:new Date("December 13, 1973 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture9.jpg'},
	{fullName:'Iting Chung',
		userName:'ic@gmail.com',
		birthday:new Date("October 08, 1984 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("February 10, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture10.jpg'},
	{fullName:'Kenny Chung',
		userName:'kc@gmail.com',
		birthday:new Date("October 06, 1982 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture11.jpg'},
	{fullName:'Mei Zhang',
		userName:'mz@gmail.com',
		birthday:new Date("October 13, 1984 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("April 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture12.jpg'},
	{fullName:'Jessica Chou',
		userName:'jc@gmail.com',
		birthday:new Date("October 13, 1959 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture13.jpg'},
	{fullName:'Beland Huang',
		userName:'bh@gmail.com',
		birthday:new Date("October 13, 1985 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture14.jpg'},
	{fullName:'Pricilla Huang',
		userName:'ph@gmail.com',
		birthday:new Date("October 13, 1986 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture15.jpg'},
	{fullName:'Felicia Zhang',
		userName:'fz@gmail.com',
		birthday:new Date("October 13, 1981 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture16.jpg'},
	{fullName:'Paul Chen',
		userName:'pc@gmail.com',
		birthday:new Date("October 13, 1980 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture17.jpg'},
	{fullName:'Zoe Yuan',
		userName:'zy@gmail.com',
		birthday:new Date("October 13, 1990 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture18.jpg'},
	{fullName:'LingShuang Wu',
		userName:'lw@gmail.com',
		birthday:new Date("October 13, 1990 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture19.jpg'},
	{fullName:'Cindy Wu',
		userName:'cw@gmail.com',
		birthday:new Date("October 13, 1985 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture20.jpg'},
	{fullName:'Peng Fei',
		userName:'pf@gmail.com',
		birthday:new Date("October 13, 1956 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture21.jpg'},
	{fullName:'wei wei',
		userName:'ww@gmail.com',
		birthday:new Date("October 13, 1988 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture22.jpg'},
	{fullName:'xiao hui',
		userName:'xh@gmail.com',
		birthday:new Date("October 13, 1980 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture23.jpg'},
	{fullName:'lilly chen',
		userName:'lc@gmail.com',
		birthday:new Date("October 13, 1970 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture24.jpg'},
	{fullName:'Michael Jordan',
		userName:'jm@gmail.com',
		birthday:new Date("October 13, 1950 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture25.jpg'},
	{fullName:'Jeremy Lin',
		userName:'jl@gmail.com',
		birthday:new Date("October 13, 1990 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture26.jpg'},
	{fullName:'Bethany Huang',
		userName:'bhf@gmail.com',
		birthday:new Date("October 13, 2012 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture27.jpg'},
	{fullName:'Kobe Brian',
		userName:'kb@gmail.com',
		birthday:new Date("October 13, 1973 11:13:00"),
		gender:'male',
		active:'true',
		signupDate:new Date("December 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture28.jpg'},
	{fullName:'Deborah Lin',
		userName:'dl@gmail.com',
		birthday:new Date("October 13, 1978 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture29.jpg'},
	{fullName:'Ting Chang',
		userName:'tc@gmail.com',
		birthday:new Date("October 13, 1985 11:13:00"),
		gender:'female',
		active:'true',
		signupDate:new Date("October 13, 2014 11:13:00"),
		password:'abc',
		profileImg:'http://res.cloudinary.com/ocfc/image/upload/v1419640791/testpicture30.jpg'}
];




$scope.createDummyData=function(){
	console.log('front-end createDummyData has been called');
	var userObj=[];
	var userIds=[];

	for (var i = 0; i < Users.length; i++){
		console.log('for loop has been called');
		userObj[i]=new UserSvc(Users[i]);

		userObj[i].$save(function(user){
			console.log(user);

			userIds.push(user.user._id);
		});
	};
	setTimeout(function(){
		console.log('chk userIds array');
		console.log(userIds);
		var fellowships=[
			{
				name:'Timothy Fellowship',
				about:'Welcome to Timothy',
				address:'920 Sierra Vista Dr',
				city:'Mountain view',
				country:'USA',
				zipcode:'98002',
				state:'CA',
				approved:true,
				active:true,
				phone:'335-399-9979'

			},
			{
				name:'Lin Xin Fellowship',
				about:'Welcome to Lin Xin',
				address:'8989 Melo Park',
				city:'Palo Alto',
				country:'USA',
				zipcode:'98002',
				state:'CA',
				approved:true,
				active:true,
				phone:'335-388-2273'

			},
			{
				name:'Morning Star Fellowship',
				about:'Welcome to Morning Star',
				address:'4141 Maize Road',
				city:'Columbus',
				country:'USA',
				zipcode:'45302',
				state:'OH',
				approved:true,
				active:true,
				phone:'225-349-2279'

			},
			{
				name:'Amazing Fellowship',
				about:'Welcome to Amazing',
				address:'3320 Time Square',
				city:'New York City',
				country:'USA',
				zipcode:'34343',
				state:'NY',
				approved:true,
				active:true,
				phone:'245-335-1237'

			},
			{
				name:'Agape Fellowship',
				about:'Welcome to Amazing',
				address:'1388 broadway',
				city:'millbrae',
				country:'usa',
				zipcode:'94030',
				state:'ca',
				approved:true,
				active:true,
				phone:'245-335-1247'

			}
		];

		//Have 5 users create new fellowship.
		for (var i = 0; i < 5; i++){
			console.log('chk users array');
			console.log(userIds[i]);

			var fellowshipObj=[];
			var fellowshipIds=[];
			fellowships[i].userId=userIds[i];
			console.log(fellowships[i]);
			console.log('for loop has been called');
			fellowshipObj[i]=new FellowshipSvc(fellowships[i]);

			fellowshipObj[i].$save(function(fellowship){
				console.log(fellowship);
				fellowshipIds.push(fellowship._id);
			});
		}
		setTimeout(function(){
			console.log('chk fellowshipIds array');
			console.log(fellowshipIds);
			//approve fellowships.
			var fellowUsers = [];
			for (var i = 5; i < 19; i++) {
				fellowUsers[i] = new FellowshipUserSvc({
					userId: userIds[i],
					fellowshipId: fellowshipIds[0],
					status: "Pending",
					role: 'member'
				});
				fellowUsers[i].$save(function (fellowUser) {
					console.log(fellowUser);
				});
			}
			setTimeout(function(){
				for (var i = 19; i < 28; i++) {
					fellowUsers[i] = new FellowshipUserSvc({
						userId: userIds[i],
						fellowshipId: fellowshipIds[1],
						status: "approved",
						role: 'member'
					});
					fellowUsers[i].$save(function (fellowUser) {
						console.log(fellowUser);
					});
				}
			},3000);
		},4000);
	}, 4000);










};






});