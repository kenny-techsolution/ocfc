//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcWallInput', function (PostSvc,$routeParams) {
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
			$scope.createPost=function(selectedPostType){
				console.log('front-end createPost is being called');

				console.log('chk selectedPostType value');
				console.log(selectedPostType);

				if (selectedPostType=='General'){
					var postType='general';
				}else{
					//default as general post
					var postType=general;
				}

				var post=new PostSvc({postType:postType,
									  general:[{content:$scope.content}],
									  postUnderGroupType:'fellowship',
									  postUnderGroupId:$routeParams.id}
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