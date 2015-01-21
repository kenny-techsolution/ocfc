angular.module('app').service('PostCommentSvc', function (CommentSvc,IdentitySvc) {
	return{
		createComment: function(postId,newComment,postComments){
			console.log('front-end PostCommentSvc is being called');
			//query post data here
			var comment=new CommentSvc({userId:IdentitySvc.currentUser._id,
				post_id:postId,
				comment:newComment,
				fullName:IdentitySvc.currentUser.fullName});

			comment.$save(function(){
				console.log('comment has been saved');
				postComments.push(comment);

				console.log('chk postComments');
				console.log(postComments);
			});
		}


	}

});
