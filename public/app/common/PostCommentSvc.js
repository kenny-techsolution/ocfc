angular.module('app').service('PostCommentSvc', function (CommentApiSvc,IdentitySvc) {
	return{
		createComment: function(postId,newComment,postComments){
			console.log('front-end PostCommentSvc is being called');
			//query post data here
			var comment=new CommentApiSvc({userId:IdentitySvc.currentUser._id,
				post_id:postId,
				comment:newComment,
				fullName:IdentitySvc.currentUser.fullName});

			comment.$save(function(){
				console.log('comment has been saved');
				postComments.push(comment);

				console.log('chk postComments');
				console.log(postComments);
			});
		},

		deleteComment:function(post,comment){
			console.log('post');
			console.log(post);

			var removedComment = CommentApiSvc.get({postId: post._id, id: comment._id}, function () {
				removedComment.$delete(function () {
					console.log('delete callback is called');
					post.comments = _.filter(post.comments, function (commentObj) {
						return commentObj._id !== comment._id;
					});
				});
			});
		}
	}

});
