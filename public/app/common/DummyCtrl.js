angular.module('app').controller('DummyCtrl', function ($http, $scope,UserSvc,ChurchSvc,
                                                         IdentitySvc, FellowshipSvc,FellowshipUserSvc, ChurchFellowshipSvc) {

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
	console.log('create 30 users');
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
				address:'920 Sierra Vista Avenue',
				city:'Mountain view',
				country:'USA',
				zipcode:'94043',
				state:'CA',
				approved:true,
				active:true,
				geo: [37.417823, -122.090220],
				phone:'650-968-2900'

			},
			{
				name:'Lin Xin Fellowship',
				about:'Welcome to Lin Xin',
				address:'71 Bay Road',
				city:'Menlo Park',
				country:'USA',
				zipcode:'94025',
				state:'CA',
				approved:true,
				active:true,
				geo: [37.477167, -122.181128],
				phone:'650-323-5550'

			},
			{
				name:'Morning Star Fellowship',
				about:'Welcome to Morning Star',
				address:'4141 Maize Road',
				city:'Columbus',
				country:'USA',
				zipcode:'43224',
				state:'OH',
				approved:true,
				active:true,
				geo: [40.050301, -82.98923],
				phone:'614-263-9287'

			},
			{
				name:'Amazing Fellowship',
				about:'Welcome to Amazing',
				address:'15 Waverly Place',
				city:'San Francisco',
				country:'USA',
				zipcode:'98002',
				state:'CA',
				approved:true,
				active:true,
				geo: [37.793482, -122.406859],
				phone:'415-362-4139'

			},
			{
				name:'Agape Fellowship',
				about:'Welcome to Amazing',
				address:'1811 34th Avenue',
				city:'San Francisco',
				country:'USA',
				zipcode:'94122',
				state:'CA',
				approved:true,
				active:true,
				geo: [37.753266, -122.492793],
				phone:'415-831-2313'

			}
		];

		//Have 5 users create new fellowship.
		console.log('create 5 fellowships');
		for (var i = 0; i < 5; i++){
			console.log('for loop has been called');
			var fellowshipObj=[];
			var fellowshipIds=[];
			fellowships[i].userId=userIds[i];
			console.log(fellowships[i]);
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
			console.log('create 14 Fellowship Users with Pending status');
			for (var i = 5; i < 19; i++) {
				console.log('for loop has been called');
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

			console.log('create 14 Fellowship Users with Approved status');
			setTimeout(function(){
				for (var i = 19; i < 28; i++) {
					console.log('for loop has been called');
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
			},4000);

			setTimeout(function() {
				console.log('chk userIds array');
				console.log(userIds);
				var churches=[
					{
						name:'San Francisco Chinese Baptist Church',
						about:'Welcome',
						address:'1811 34th Avenue',
						city:'San Francisco',
						state:'CA',
						country:'USA',
						zipcode:'94122',
						phone:'415-831-2313',
						fax:'344-343-3223',
						faithStatement:'faith statement goes here',
						mission:'mission goes here',
						vision:'vision goes here',
						startDate:new Date("October 13, 2014 11:13:00"),
						approved:true,
						url:'http://sfcbc.org/'

					},
					{
						name:'Chinese Church in Christ',
						about:'Welcome to CCIC',
						address:'920 Sierra Vista Avenue',
						city:'Mountain View',
						state:'CA',
						country:'USA',
						zipcode:'94043',
						phone:'650-968-2900',
						fax:'344-343-3223',
						faithStatement:'faith statement goes here',
						mission:'mission goes here',
						vision:'vision goes here',
						startDate:new Date("October 11, 2014 11:13:00"),
						approved:true,
						url:'http://ccic.org/mountainview/'

					},
					{
						name:'Columbus Chinese Christian Church',
						about:'Welcome to CCCC',
						address:'4141 Maize Road',
						city:'Columbus',
						state:'OH',
						country:'USA',
						zipcode:'43224',
						phone:'614-263-9287',
						fax:'344-343-3223',
						faithStatement:'faith statement goes here',
						mission:'mission goes here',
						vision:'vision goes here',
						startDate:new Date("October 09, 2014 11:13:00"),
						approved:true,
						url:'http://www.columbusccc.org/modx/index.php?id=47'

					},
					{
						name:'The Home of Christ',
						about:'Welcome',
						address:'71 Bay Road',
						city:'Menlo Park',
						state:'CA',
						country:'USA',
						zipcode:'94025',
						phone:'650-323-5550',
						fax:'344-343-3223',
						faithStatement:'faith statement goes here',
						mission:'mission goes here',
						vision:'vision goes here',
						startDate:new Date("October 13, 2014 11:13:00"),
						approved:true,
						url:'http://hoc1.org/English/contact'

					},
					{
						name:'OCFC Church',
						about:'Welcome to OCFC',
						address:'1388 Broadway',
						city:'Millbrae',
						state:'CA',
						country:'USA',
						zipcode:'94030',
						phone:'343-362-4139',
						fax:'344-343-3223',
						faithStatement:'faith statement goes here',
						mission:'mission goes here',
						vision:'vision goes here',
						startDate:new Date("August 13, 2014 11:13:00"),
						approved:true,
						url:'www.ocfc.org'

					}
				];
				console.log('create 5 churches');
				console.log('check churches array before loop');
				console.log(churches);

				//Have 5 users create 5 churches.
				for (var j = 0; j < 5; j++) {
					console.log('for loop has been called');
					var churchObj = [];
					var churchIds = [];
					console.log(churches[j]);
					churches[j].userId=userIds[j];
					churchObj[j] = new ChurchSvc(churches[j]);

					churchObj[j].$save(function (church) {
						console.log(church);
						churchIds.push(church._id);
					});
				};


				console.log('link 4 fellowships to 1 church');
				console.log('link 1 fellowship to OCFC church as Stand alone');
				console.log('check fellowships array before loop');
				console.log(fellowships);
				setTimeout(function() {
					//link 4 fellowships to 1 church.
					//link 1 fellowship to OCFC church.
					for(var k=0; k<5; k++){
						console.log('for loop has been called');

						//set to ocfc id
						if (k===4){
							var churchFellowshipObj = {fellowshipId:fellowshipIds[k],
								churchId:churchIds[4],
								status:'Approved'};

						}else{//set to 1st element of churches array
							var churchFellowshipObj = {fellowshipId:fellowshipIds[k],
								churchId:churchIds[0],
								status:'Approved'};
						};

						console.log('chk churchFellowshipObj');
						console.log(churchFellowshipObj);

						var churchFellowship = new ChurchFellowshipSvc(churchFellowshipObj);

						console.log('chk churchFellowship');
						console.log(churchFellowship);

						churchFellowship.$save(function (churchFellowships) {
							console.log('chk churchFellowships');
							console.log(churchFellowships);

						});
					};
				},5000);

			},5000);
		},4000);
	}, 4000);

};


});