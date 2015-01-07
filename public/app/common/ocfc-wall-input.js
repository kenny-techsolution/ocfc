//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcWallInput', function (PostSvc) {
	return{
		restrict: 'E',
		scope: {
		},
		templateUrl: '/partials/common/ocfc-wall-input',
		controller: function ($scope) {

			$scope.selectedPostType = "General";
			$scope.postTypes = [{value:'General',label:'General'},
							 {value:'Testimony',label:'Testimony'},
							 {value:'Prayer',label:'Prayer'},
							 {value:'Question',label:'Question'},
							 {value:'Event',label:'Event'},
							 {value:'Announcement',label:'Announcement'}];




			//save post input data
			$scope.postInput=function(selectedPostType){
				console.log('front-end postInput is being called');

				console.log('chk selectedPostType value');
				console.log(selectedPostType);

				if (selectedPostType=='General'){
					var postTypeInt=0;
				}else{
					//default as 0
					var postTypeInt=0;
				}

				var post=new PostSvc({postType:postTypeInt,
									  general:[{content:$scope.content}]}
				);

				console.log('chk post obj before saving it');
				console.log(post);

				post.$save().then(function(){
					console.log('chk if post data has been saved in Post dataset');
					console.log(post);
				});
			};


		}
	};
});