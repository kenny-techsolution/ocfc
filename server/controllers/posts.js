var Post = require('mongoose').model('Post'),
	Event = require('mongoose').model('Event'),
	Image = require('mongoose').model('Image'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	html_strip = require('htmlstrip-native'),
	async = require('async'),
	_ = require('lodash');


var stripHtmlforFields = function (obj, fields) {
	console.log('var stripHtmlforFields is being called');
	console.log(stripHtmlforFields);

	_.forEach(fields, function (key) {
		obj[key] = html_strip.html_strip(obj[key], commFunc.htmlStripOptions);
		console.log('chk obj[key] in stripHtmlforFields');
		console.log(obj[key]);
	});
	return obj;
};

//round-1
var savePost = function (post, res) {
	console.log('server savePost has been called');
	post.save(function (err) {
		console.log('post.save function has been called');
		if (err) return res.json(err);
		Post.populate(post, 'eventId general testimony postBy', function (err, post) {
			if (err) return res.json(err);
			return res.json(post);
			console.log('chk post obj');
			console.log(post);
		});
	});
};


//round-1
var createQuestionPost = function (postObj, req, res) {
	var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType', 'postUnderGroupId', 'content']);
	if (errors.length > 0) {
		return res.json({statue: "failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['content']);
	postObj.question = postObj.content;
	postObj.postBy = commFunc.reqSessionUserId(req);
	//TODO: perform image validation.
	var post = new Post(postObj);
	return savePost(post, res);
};
//round-1
var createPrayerPost = function (postObj, req, res) {
	var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType', 'postUnderGroupId', 'content']);
	if (errors.length > 0) {
		return res.json({statue: "failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['content']);
	postObj.prayer = postObj.content;
	postObj.postBy = commFunc.reqSessionUserId(req);
	//TODO: perform image validation.
	var post = new Post(postObj);
	return savePost(post, res);
};

//round-1
var createGeneralPost = function (postObj, req, res) {
	console.log('server createGeneralPost has been called');
	console.log('chk postObj');
	console.log(postObj);

	var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType', 'postUnderGroupId', 'general']);
	console.log('chk errors obj within createGeneralPost');
	console.log(errors);

	if (errors.length > 0) {
		console.log('errors.length > 0');
		return res.json({statue: "failed", errors: errors});
	}
	//TODO need to implement stripHTML
	//postObj = stripHtmlforFields(postObj, ['general']);
	//	console.log('chk postObj after stripHtmlforFields');
	//	console.log(postObj);

	//TODO: perform image validation.

	postObj.postBy = commFunc.reqSessionUserId(req);
	var post = new Post(postObj);

	console.log('chk post obj after new Post creation');
	console.log(post);

	//if undefined then set to empty array
	var imageIds = postObj.imageIds||[];

	//update all images for post.
	if (imageIds.length > 0) {
		async.forEachLimit(imageIds, 3, function (imageId, callback) {
			Image.findByIdAndUpdate(imageId, {used: true}, function (err) {
				if (err) return callback(err)
				callback();
			});
		}, function (err) {
			if (err) return res.json(err);
			return savePost(post, res);
		});
	} else {
		return savePost(post, res);
	}
};
//round-1
var createTestimonyPost = function (postObj, req, res) {
	var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType', 'postUnderGroupId', 'content', 'title']);
	if (errors.length > 0) {
		return res.json({statue: "failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['content', 'title']);
	//TODO: perform image validation.
	postObj.testimony = [
		{ title: postObj.title, content: postObj.content}
	];
	postObj.postBy = commFunc.reqSessionUserId(req);
	post = new Post(postObj);

	var imageIds = postObj.imageIds;

	//update all images for post.
	if (imageIds.length > 0) {
		async.forEachLimit(imageIds, 3, function (imageId, callback) {
			Image.findByIdAndUpdate(imageId, {used: true}, function (err) {
				if (err) return callback(err)
				callback();
			});
		}, function (err) {
			if (err) return res.json(err);
			return savePost(post, res);
		});
	} else {
		return savePost(post, res);
	}
};

var createEventPost = function (postObj, req, res) {
	var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType', 'postUnderGroupId', 'title', 'description', 'fromDate', 'toDate', 'where', 'hostBy', 'invitees']);
	if (errors.length > 0) {
		return res.json({statue: "failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['title', 'description', 'where']);
	//TODO: perform image validation.
	event = new Event({
		title: postObj.title,
		imagesIds: postObj.imagesIds || [],
		description: postObj.description,
		fromDate: postObj.fromDate,
		toDate: postObj.toDate,
		where: postObj.where,
		hostBy: postObj.hostBy,
		invitees: postObj.invitees
	});
	event.save(function (err) {
		if (err) return res.json(err);
		var imageIds = postObj.imageIds;

		var post = new Post({
			postType: postObj.postType,
			postBy: commFunc.reqSessionUserId(req),
			eventId: event._id,
			postUnderGroupType: postObj.postUnderGroupType,
			postUnderGroupId: postObj.postUnderGroupId
		});

		//update all images for event post.
		if (imageIds.length > 0) {
			async.forEachLimit(imageIds, 3, function (imageId, callback) {
				Image.findByIdAndUpdate(imageId, {used: true}, function (err) {
					if (err) return callback(err)
					callback();
				});
			}, function (err) {
				if (err) return res.json(err);
				post.imageIds = imageIds;
				return savePost(post, res);
			});
		} else {
			return savePost(post, res);
		}
	});
};

var _updatePost = function (id, userId, postObj, res) {
	Post.findOneAndUpdate({_id: id, postBy: userId}, postObj, function (err, post) {
		if (err) return res.json(err);
		return res.json(post);
	});
};

var postFollowByImageUpdate=function(req,res,post){
	var imageIds = req.body.imageIds;

	//update all images for post.
	if(imageIds.length > 0){
		async.forEachLimit(imageIds, 3, function(imageId, callback) {
			Image.findByIdAndUpdate(imageId, {used: true}, function(err){
				if (err) return callback(err)
				callback();
			});
		}, function(err) {
			if (err) return res.json(err);
			return res.json(post);
		});
	} else {
		return res.json(post);
	}
};

exports.createPost = function (req, res) {
	console.log('server createPost has been called');
	var postObj = req.body;
	console.log('chk postObj');
	console.log(postObj);

	console.log('chk postObj.postUnderGroupType');
	console.log(postObj.postUnderGroupType);

	console.log('chk postObj.postUnderGroupId');
	console.log(postObj.postUnderGroupId);

	console.log('chk postObj.postType');
	console.log(postObj.postType);

	if (!commFunc.isGroupMember(postObj.postUnderGroupType, req.user, postObj.postUnderGroupId)) {
		return res.json({status: "fail", message: "you are not allowed to create post on this wall which you're not a member of."});
	}

	postObj = deleteKey(postObj, ['comments', 'updatedOn', 'postBy']);

	//var postTypeArray = ['general','testimony','question','prayer','event'];
	if (_.has(postObj, 'postType')) {
		if (postObj.postType === 'question') {
			console.log('question postType is met');
			return createQuestionPost(postObj, req, res);
		}
		if (postObj.postType === 'prayer') {
			console.log('prayer postType is met');
			return createPrayerPost(postObj, req, res);
		}
		if (postObj.postType === 'general') {
			console.log('general postType is met');
			return createGeneralPost(postObj, req, res);
		}
		if (postObj.postType === 'testimony') {
			console.log('testimony postType is met');
			return createTestimonyPost(postObj, req, res);
		}
		if (postObj.postType === 'event') {
			console.log('event postType is met');
			return createEventPost(postObj, req, res);
		}
	}
};

exports.getPost = function (req, res) {
	Post.findById(req.params.id).populate('eventId').exec(function (err, post) {
		if (err) return res.json(err);
		if (!commFunc.isGroupMember(post.postUnderGroupType.toString(), req.user, post.postUnderGroupId.toString())) {
			return res.json({status: "fail", message: "you are not allowed to get post on this wall which you're not a member of."});
		}
		return res.json(post);
	});
};

//get Round-1
exports.queryPost = function (req, res) {
	console.log('server queryPost has been called');

	var postObj = req.query;

	console.log('chk postObj query obj');
	console.log(postObj);

	var errors = commFunc.checkRequiredFields(postObj, ['postUnderGroupType', 'postUnderGroupId']);
	console.log('chk errors obj where postUnderGroupType & postUnderGroupId are required fields');
	console.log(errors);

	if (errors.length > 0) {
		console.log('errors.length>0 conditon is met');
		return res.json({statue: "failed", errors: errors});
	}
	if (!commFunc.isGroupMember(postObj.postUnderGroupType, req.user, postObj.postUnderGroupId)) {
		console.log('check if you are a member of this group');
		return res.json({status: "fail", message: "you are not allowed to query posts on this wall which you're not a member of."});
	}

	var filteredKeys=commFunc.removeInvalidKeys(req.query,['postType', 'postBy', 'postUnderGroupType', 'postUnderGroupId']);
	var condition = {};
	var whereClause = {};
	console.log('chk filteredKeys obj');
	console.log(filteredKeys);
	var keys=_.keys(filteredKeys)
	_.forEach(keys, function (key) {
		console.log('chk key obj');
		console.log(key);
		if (key == 'postUnderGroupType') {
			whereClause.postUnderGroupType = req.query[key];
		} else if (key == 'postUnderGroupId') {
			whereClause.postUnderGroupId = req.query[key];
		} else {
			condition[key] = req.query[key];
		}
	});
	console.log('chk condition obj');
	console.log(condition);

	console.log('chk whereClause obj');
	console.log(whereClause);

	Post.find(condition).where(whereClause).populate('postBy').exec(function (err, posts) {
		console.log('server Post.find has been called that returns post result data set');
		if (err) return res.json(err);
		return res.json(posts);
	});
};


//put . need to provide postType
exports.updatePost = function (req, res) {
	console.log('server updatePost function has been called');
	var postObj = req.body;

	postObj = deleteKey(postObj, ['comments', 'updatedOn', 'postBy']);

	console.log('chk postObj after some keys have been deleted');
	console.log(postObj);

	if (_.has(postObj, 'postType')) {
		if (postObj.postType === 'question') {
			console.log('postType of question has been met');
			var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['content']);
			if (errors.length > 0) {
				return res.json({statue: "failed", errors: errors});
			}
			delete postObj.postType;
			postObj = stripHtmlforFields(postObj, ['content']);
			postObj.question = postObj.content;
			postObj.updatedOn = new Date();
			return _updatePost(req.params.id, commFunc.reqSessionUserId(req), postObj, res);
		}
		if (postObj.postType === 'prayer') {
			console.log('postType of prayer has been met');
			var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['content']);
			if (errors.length > 0) {
				return res.json({statue: "failed", errors: errors});
			}
			delete postObj.postType;
			postObj = stripHtmlforFields(postObj, ['content']);
			postObj.prayer = postObj.content;
			postObj.updatedOn = new Date();
			return _updatePost(req.params.id, commFunc.reqSessionUserId(req), postObj, res);
		}
		if (postObj.postType === 'general') {
			console.log('postType of general has been met');
			//step1-makes sure content entry exist
			var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['content']);
			if (errors.length > 0) {
				return res.json({statue: "failed", errors: errors});
			}

			//Remove postType field
			delete postObj.postType;

			//Format content for protection
			postObj = stripHtmlforFields(postObj, ['content']);

			//insert content into appropriate postType
			postObj.general = {
				content: postObj.content
			}
			//grab latest postObj and assign to post
			var post = new Post(postObj);
			console.log("postObj");
console.log(postObj);
			Post.findOneAndUpdate({_id: req.params.id, postBy: commFunc.reqSessionUserId(req)},{ "$set": {"general.0.content": postObj.content,"imageIds": postObj.imageIds }},
								   function(err, post){
									   if (err) return res.json(err);
									   return postFollowByImageUpdate(req,res,post);
								   });
		}
		if (postObj.postType === 'testimony') {
			console.log('postType of testimony has been met');
			var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['content', 'title']);
			if (errors.length > 0) {
				return res.json({statue: "failed", errors: errors});
			}
			delete postObj.postType;
			postObj = stripHtmlforFields(postObj, ['content', 'title']);
			var testimony = {
				title: postObj.title,
				content: postObj.content
			};
//			post = new Post(postObj);

			Post.findOneAndUpdate({_id: req.params.id, postBy: commFunc.reqSessionUserId(req)},{ "$set": {"testimony.0" : testimony, "imageIds": postObj.imageIds}},
									function(err, post){
										if (err) return res.json(err);
										return postFollowByImageUpdate(req,res,post);
				});
		}
		if (postObj.postType === 'event') {
			console.log('postType of event has been met');
			delete postObj.postType;
			Post.findOne({_id: req.params.id, postBy: commFunc.reqSessionUserId(req)}).exec(function (err, post) {
				if (err) return res.json(err);
				var event=commFunc.removeInvalidKeys(req.body,['albumId', 'imageIds', 'title',
															   'description', 'fromDate', 'toDate', 'where', 'banner']);
				Event.findOneAndUpdate({_id: post.eventId}, event, function (err, NumberUpdated, raw) {
					if (err) return res.json(err);
					Post.populate(post, 'eventId general testimony', function (err, post) {
						if (err) return res.json(err);
						return postFollowByImageUpdate(req,res,post);
					});
				});
			});
		}
	}
};

// Round 1
exports.removePost = function (req, res) {

	Post.where().findOneAndRemove({_id: req.params.id, postBy: commFunc.reqSessionUserId(req)}, function (err) {
		if (err) return res.json(err);
		return res.json({status: req.params.id + "removed successfully."});
	});
};

/*---Comment related-----*/
exports.addCommentToPost = function (req, res) {
	console.log('server addCommentToPost function has been called');
	console.log('chk req obj');
	console.log(req);

	Post.findById(req.params.post_id).exec(function (err, post) {
		console.log('server Post.findById has been called');
		if (err) return res.json(err);

		if (!commFunc.isGroupMember(post.postUnderGroupType.toString(), req.user, post.postUnderGroupId.toString())) {
			return res.json({status: "fail", message: "you are not allowed to create post on this wall which you're not a member of."});
		}
		commentObj = req.body;
		errors = commFunc.checkRequiredFields(commentObj, ['comment']);
		console.log('chk errors after checking required fields');
		console.log(errors);

		if (errors > 0) return res.json(errors);
		commentObj = {
			userId: commFunc.reqSessionUserId(req),
			comment: html_strip.html_strip(commentObj.comment, commFunc.htmlStripOptions),
			profileImg: req.user.profileImg,
			fullName: req.user.fullName
		};
		post.comments.push(commentObj);
		post.save(function (err) {
			console.log('post.save function has been called');
			if (err) return res.json(err);
			//return last array element
			return res.json(post.comments[post.comments.length-1]);
		});
	});
};

exports.updateCommentFromPost = function (req, res) {
	Post.findById(req.params.post_id).exec(function (err, post) {
		if (err) return res.json(err);
		commentObj = req.body;
		errors = commFunc.checkRequiredFields(commentObj, ['comment']);
		if (errors > 0) return res.json(errors);

		if (!commFunc.isGroupMember(post.postUnderGroupType.toString(), req.user, post.postUnderGroupId.toString())) {
			return res.json({status: "fail", message: "you are not allowed to create post on this wall which you're not a member of."});
		}
		var comment = post.comments.id(req.params.comment_id);
		if (comment.userId.toString() === commFunc.reqSessionUserId(req).toString()) {
			commentObj = req.body;
			comment.comment = html_strip.html_strip(commentObj.comment, commFunc.htmlStripOptions);
			comment.updatedOn = new Date();
		} else {
			return res.json({status: "you are not allowed to modify the comment of not yours."});
		}
		return savePost(post, res);
	});
};

exports.deleteCommentFromPost = function (req, res) {
	console.log('server deleteCommentFromPost has been called');
	Post.findById(req.params.post_id).exec(function (err, post) {
		console.log('server Post.findById has been called');
		var comment = post.comments.id(req.params.comment_id);
		console.log('chk comment obj');
		console.log(comment);
		if (comment.userId.toString() === commFunc.reqSessionUserId(req).toString()) {
			comment.remove();
		} else {
			return res.json({status: "you are not allowed to remove the comment of not yours."});
		}
		return savePost(post, res);
	});
};
