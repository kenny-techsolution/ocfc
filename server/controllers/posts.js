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
	console.log('chk post from savePost field');
	console.log(post);

	post.save(function (err) {
		console.log('post.save function has been called');
		console.log('chk post within savePost');
		console.log(post);
		if (err) return res.json(err);

		if (post.postType === 'general') {
			console.log('general post type has been created');
			Post.populate(post, 'eventId general postBy imageIds', function (err, post) {
				if (err) return res.json(err);
				console.log('chk final post obj');
				console.log(post);
				return res.json(post);
			});
		} else if (post.postType === 'announcement') {
			console.log('announcement post type has been created');
			Post.populate(post, 'eventId announcement postBy imageIds', function (err, post) {
				if (err) return res.json(err);
				console.log('chk final post obj');
				console.log(post);
				return res.json(post);
			});
		} else if (post.postType === 'testimony') {
			console.log('testimony post type has been created');
			Post.populate(post, 'eventId testimony postBy imageIds', function (err, post) {
				if (err) return res.json(err);
				console.log('chk final post obj');
				console.log(post);
				return res.json(post);
			});

		} else if (post.postType === 'question') {
			console.log('question post type has been created');
			Post.populate(post, 'eventId postBy imageIds', function (err, post) {
				if (err) return res.json(err);
				console.log('chk final post obj');
				console.log(post);
				return res.json(post);
			});
		} else if (post.postType === 'prayer') {
			console.log('prayer post type has been created');
			Post.populate(post, 'eventId postBy imageIds', function (err, post) {
				if (err) return res.json(err);
				console.log('chk final post obj');
				console.log(post);
				return res.json(post);
			});
		} else if (post.postType === 'event') {
			console.log('event post type has been created');
			Post.populate(post, 'eventId event postBy imageIds', function (err, post) {
				if (err) return res.json(err);
				console.log('chk final post obj');
				console.log(post);
				return res.json(post);
			});
		} else if (post.postType === 'announcement') {
			console.log('announcement post type has been created');
			Post.populate(post, 'eventId announcement postBy imageIds', function (err, post) {
				if (err) return res.json(err);
				console.log('chk final post obj');
				console.log(post);
				return res.json(post);
			});
		} else {
			//Default as general post
			console.log('default general post type has been created');
			Post.populate(post, 'eventId general postBy imageIds', function (err, post) {
				if (err) return res.json(err);
				console.log('chk final post obj');
				console.log(post);
				return res.json(post);
			});
		}

	});
};

//round-1
var createQuestionPost = function (postObj, req, res) {
	console.log('server createQuestionPost has been called');
	console.log('chk postObj for question post');
	console.log(postObj);

	var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType', 'postUnderGroupId', 'question']);
	console.log('chk errors obj within createQuestionPost');
	console.log(errors);

	if (errors.length > 0) {
		console.log('errors condition met');
		return res.json({statue: "failed", errors: errors});
	}
//	postObj = stripHtmlforFields(postObj, ['content']);
//	postObj.question = postObj.content;

	postObj.postBy = commFunc.reqSessionUserId(req);
	//TODO: perform image validation.
	var post = new Post(postObj);

	console.log('chk var post obj after new post creation');
	console.log(post);

	//if undefined then set to empty array
	var imageIds = postObj.imageIds || [];

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
var createPrayerPost = function (postObj, req, res) {
	console.log('server createPrayerPost has been called');

	var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType', 'postUnderGroupId', 'prayer']);
	if (errors.length > 0) {
		return res.json({statue: "failed", errors: errors});
	}


	//postObj = stripHtmlforFields(postObj, ['content']);
	//postObj.prayer = postObj.content;
	postObj.postBy = commFunc.reqSessionUserId(req);
	//TODO: perform image validation.
	var post = new Post(postObj);

	console.log('chk var post obj after new post creation');
	console.log(post);

	//if undefined then set to empty array
	var imageIds = postObj.imageIds || [];

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
	var imageIds = postObj.imageIds || [];

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
	console.log('server createTestimonyPost has been called');

	console.log('chk postObj obj');
	console.log(postObj);

	//update 'title' & 'content' to 'testimony'
	var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType', 'postUnderGroupId', 'testimony']);
	console.log('chk errors obj withing createTestimonyPost');
	console.log(errors);

	if (errors.length > 0) {
		console.log('errors.length > 0');
		return res.json({statue: "failed", errors: errors});
	}
	//postObj = stripHtmlforFields(postObj, ['content', 'title']);
	//TODO: perform image validation.
	//	postObj.testimony = [
	//		{ title: postObj.title, content: postObj.content}
	//	];

	postObj.postBy = commFunc.reqSessionUserId(req);
	var post = new Post(postObj);

	console.log('chk var post obj after new post creation');
	console.log(post);

	//if undefined then set to empty array
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
	//var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType', 'postUnderGroupId', 'title', 'description', 'fromDate', 'toDate', 'where', 'hostBy', 'invitees']);
	//if (errors.length > 0) {
	//	return res.json({statue: "failed", errors: errors});
	//}
	//postObj = stripHtmlforFields(postObj, ['title', 'description', 'where']);

	console.log('chk createEventPost, postObj obj');
	console.log(postObj);

	//TODO: perform image validation.
	event = new Event({
		title: postObj.title,
		imagesIds: postObj.imagesIds || [],
		description: postObj.description,
		fromDate: postObj.fromDate,
		toDate: postObj.toDate,
		where: postObj.where,
		hostBy: postObj.hostBy
		//invitees: postObj.invitees
	});
	event.save(function (err) {
		if (err) return res.json(err);
		console.log('event has been created');
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
//Added on 11-19-2015
var createAnnouncementPost = function (postObj, req, res) {
	console.log('server createAnnouncementPost has been called');
	console.log('chk postObj');
	console.log(postObj);

	var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType', 'postUnderGroupId', 'announcement']);
	console.log('chk errors obj within createAnnouncementPost');
	console.log(errors);

	if (errors.length > 0) {
		console.log('errors.length > 0');
		return res.json({statue: "failed", errors: errors});
	}
	//TODO need to implement stripHTML
	//postObj = stripHtmlforFields(postObj, ['announcement']);
	//	console.log('chk postObj after stripHtmlforFields');
	//	console.log(postObj);

	//TODO: perform image validation.

	postObj.postBy = commFunc.reqSessionUserId(req);
	var post = new Post(postObj);

	console.log('chk post obj after new Post creation');
	console.log(post);

	//if undefined then set to empty array
	var imageIds = postObj.imageIds || [];

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

var _updatePost = function (id, userId, postObj, res) {
	console.log('server _updatePost has been called');

	console.log('chk id');
	console.log(id);

	console.log('chk userId');
	console.log(userId);

	console.log('chk postObj');
	console.log(postObj);

	Post.findOneAndUpdate({_id: id, postBy: userId}, postObj, function (err, post) {
		console.log('Post.findOneAndUpdate has been called before error');
		if (err) return res.json(err);
		console.log('chk post from Post.findOneAndUpdate func after error condition');
		console.log(post);
		return res.json(post);
	});
};

var postFollowByImageUpdate = function (req, res, post) {
	console.log('server postFollowByImageUpdate has been called');
	console.log('chk req.body obj');
	console.log(req.body);

	var imageIds = req.body.imageIds || [];

	//update all images for post.
	if (imageIds.length > 0) {
		console.log('if(imageIds.length > 0) condition is met');
		async.forEachLimit(imageIds, 3, function (imageId, callback) {
			Image.findByIdAndUpdate(imageId, {used: true}, function (err) {
				console.log('Image.findByIdAndUpdate func called');
				console.log('chk imageId');
				console.log(imageId);
				if (err) return callback(err)
				callback();
			});
		}, function (err) {
			console.log('callback is called');
			if (err) return res.json(err);
			return res.json(post);
		});
	} else {
		console.log('else condition is met');
		console.log('chk post obj being returned');
		console.log(post);
		return res.json(post);
	}

};

exports.createPost = function (req, res) {
	console.log('server createPost has been called');
	var postObj = req.body;
	console.log('chk postObj from createPost');
	console.log(postObj);

	console.log('chk postObj.postUnderGroupType');
	console.log(postObj.postUnderGroupType);

	console.log('chk postObj.postUnderGroupId');
	console.log(postObj.postUnderGroupId);

	console.log('chk postObj.postType');
	console.log(postObj.postType);

//	console.log('chk postObj.testimony');
//	console.log(postObj.testimony);
//
//	console.log('chk postObj.question');
//	console.log(postObj.question);

	if (!commFunc.isGroupMember(postObj.postUnderGroupType, req.user, postObj.postUnderGroupId)) {
		return res.json({status: "fail", message: "you are not allowed to create post on this wall which you're not a member of."});
	}

	postObj = deleteKey(postObj, ['comments', 'updatedOn', 'postBy']);

	//var postTypeArray = ['general','testimony','question','prayer','event','announcement'];
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
		if (postObj.postType === 'announcement') {
			console.log('announcement postType is met');
			return createAnnouncementPost(postObj, req, res);
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

	var filteredKeys = commFunc.removeInvalidKeys(req.query, ['postType', 'postBy', 'postUnderGroupType', 'postUnderGroupId','createdOn']);
	var condition = {};
	var whereClause = {};
	console.log('chk filteredKeys obj');
	console.log(filteredKeys);
	var keys = _.keys(filteredKeys)
	_.forEach(keys, function (key) {
		console.log('chk key obj');
		console.log(key);
		if (key == 'postUnderGroupType') {
			whereClause.postUnderGroupType = req.query[key];
		} else if (key == 'postUnderGroupId') {
			whereClause.postUnderGroupId = req.query[key];
		} else if (key == 'createdOn') {
			whereClause.createdOn = {$lt: req.query[key]};
		}else if (key == 'postType') {
			whereClause.postType=req.query[key]
		}else {
			condition[key] = req.query[key];
		}
	});
	console.log('chk condition obj');
	console.log(condition);

	console.log('chk whereClause obj');
	console.log(whereClause);
	//01.13.2015 added to populate imageIds
	//01.14.2015 added sort({createdOn: 'descending'})
	Post.find(condition).sort({createdOn: 'descending'}).limit(20).where(whereClause).populate('postBy imageIds eventId eventId.hostBy').exec(function (err, posts) {
		console.log('server Post.find has been called within queryPost func');
		console.log('chk posts array');
		console.log(posts);
		if (err) return res.json(err);
		return res.json(posts);
	});
};

//put . need to provide postType
exports.updatePost = function (req, res) {
	console.log('server updatePost function has been called');
	var postObj = req.body;
	console.log('chk postObj');
	console.log(postObj);

	postObj = deleteKey(postObj, ['comments', 'updatedOn', 'postBy']);

	console.log('chk postObj after some keys have been deleted');
	console.log(postObj);

	if (_.has(postObj, 'postType')) {
		//var postTypeArray = ['general','testimony','question','prayer','event'];
		if (postObj.postType === 'general') {
			console.log('postType of question has been met');
			var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['general']);
			console.log('chk errors');
			console.log(errors);
			if (errors.length > 0) {
				return res.json({statue: "failed", errors: errors});
			}
			delete postObj.postType;
			//TODO update htmlstrip
			//postObj = stripHtmlforFields(postObj, ['general']);
			//postObj.general = postObj.content;
			postObj.updatedOn = new Date();

			return _updatePost(req.params.id, commFunc.reqSessionUserId(req), postObj, res);
		}

		if (postObj.postType === 'announcement') {
			console.log('postType of announcement has been met');
			console.log('chk postObj for announcement post');
			console.log(postObj);

			var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['announcement']);
			console.log('chk errors');
			console.log(errors);
			if (errors.length > 0) {
				return res.json({statue: "failed", errors: errors});
			}
			delete postObj.postType;
			//TODO update htmlstrip
			//postObj = stripHtmlforFields(postObj, ['announcement']);
			//postObj.general = postObj.content;
			postObj.updatedOn = new Date();

			return _updatePost(req.params.id, commFunc.reqSessionUserId(req), postObj, res);
		}

		if (postObj.postType === 'testimony') {
			console.log('postType of testimony has been met');
			var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['testimony']);
			console.log('chk errors');
			console.log(errors);
			if (errors.length > 0) {
				return res.json({statue: "failed", errors: errors});
			}
			delete postObj.postType;
			//TODO update htmlstrip
			//postObj = stripHtmlforFields(postObj, ['general']);
			//postObj.general = postObj.content;
			postObj.updatedOn = new Date();
			return _updatePost(req.params.id, commFunc.reqSessionUserId(req), postObj, res);
		}
		if (postObj.postType === 'question') {
			console.log('postType of question has been met');
			var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['question']);
			console.log('chk errors');
			console.log(errors);
			if (errors.length > 0) {
				return res.json({statue: "failed", errors: errors});
			}
			delete postObj.postType;
			//TODO update htmlstrip
			//postObj = stripHtmlforFields(postObj, ['general']);
			//postObj.general = postObj.content;
			postObj.updatedOn = new Date();
			return _updatePost(req.params.id, commFunc.reqSessionUserId(req), postObj, res);
		}
		if (postObj.postType === 'prayer') {
			console.log('postType of prayer has been met');
			var errors = commFunc.checkRequiredFieldsForPostType(postObj.postType, postObj, ['prayer']);
			if (errors.length > 0) {
				return res.json({statue: "failed", errors: errors});
			}
			delete postObj.postType;
			//postObj = stripHtmlforFields(postObj, ['content']);
			//postObj.prayer = postObj.content;
			postObj.updatedOn = new Date();
			return _updatePost(req.params.id, commFunc.reqSessionUserId(req), postObj, res);
		}

		if (postObj.postType === 'event') {
			console.log('postType of event has been met');
			delete postObj.postType;
			Post.findOne({_id: req.params.id, postBy: commFunc.reqSessionUserId(req)}).exec(function (err, post) {
				if (err) return res.json(err);

				//TODO need to fix this
				//var event=commFunc.removeInvalidKeys(req.body,['albumId', 'imageIds', 'title',
				//											   'description', 'fromDate', 'toDate', 'where', 'banner']);
				//console.log('chk event obj after key removal');
				//console.log(event);

				console.log('chk postObj.eventId._id');
				console.log(postObj.eventId._id);

				Event.findOneAndUpdate({_id: postObj.eventId._id}, postObj.eventId, function (err, NumberUpdated, raw) {
					console.log('Event.findOneAndUpdate has been called before error');
					if (err) return res.json(err);
					Post.populate(postObj, 'eventId', function (err, post) {
						console.log('chk post from Post.populate func after error condition');
						if (err) return res.json(err);
						return postFollowByImageUpdate(req, res, post);
					});
				});
			});
		}
	}
};

// Round 1
exports.removePost = function (req, res) {
	console.log('server removePost has been called');
	Post.where().findOneAndRemove({_id: req.params.id, postBy: commFunc.reqSessionUserId(req)}, function (err) {
		if (err) return res.json(err);
		return res.json({status: req.params.id + "removed successfully."});
	});
	//TODO need to remove images from Image data set
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
			console.log('chk within addCommentToPost before error');
			if (err) return res.json(err);
			//return last array element
			return res.json(post.comments[post.comments.length - 1]);
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
