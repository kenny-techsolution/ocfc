var Post = require('mongoose').model('Post'),
	Event = require('mongoose').model('Event'),
	Image = require('mongoose').model('Image'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	html_strip=require('htmlstrip-native'),
	async = require('async'),
	_=require('lodash');

var checkRequiredFieldsForPostType = function (postType, obj, fields) {
	var errors = []
	_.forEach(fields, function(key){
		if(!_.has(obj, key)){
			errors.push(key + " is required field for postType=" + postType);
		}
	});
	return errors;
};

var checkRequiredFields = function (obj, fields) {
	var errors = []
	_.forEach(fields, function(key){
		if(!_.has(obj, key)){
			errors.push(key + " is required field.");
		}
	});
	return errors;
};

var htmlStripOptions = {
	include_script : false,
	include_style : false,
	compact_whitespace : true
};

var stripHtmlforFields = function (obj, fields) {
	console.log(obj);
	console.log(fields);
	_.forEach(fields, function(key){
		obj[key] = html_strip.html_strip(obj[key], htmlStripOptions);
	});
	return obj;
};
//round-1
var savePost = function(post, res) {
	post.save(function(err){
		if (err) return res.json(err);
		Post.populate(post, 'eventId general testimony', function(err, post){
			if (err) return res.json(err);
			return res.json(post);
		});
	});
};
//round-1
var createQuestionPost = function(postObj, req, res) {
	var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType','postUnderGroupId','content']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['content']);
	postObj.question = postObj.content;
	postObj.postBy = req.user._id;
	//TODO: perform image validation.
	console.log(postObj);
	var post = new Post(postObj);
	return savePost(post, res);
};
//round-1
var createPrayerPost = function(postObj, req, res) {
	var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType','postUnderGroupId','content']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['content']);

	postObj.prayer = postObj.content;
	postObj.postBy = req.user._id;
	//TODO: perform image validation.
	var post = new Post(postObj);
	console.log(postObj);
	return savePost(post, res);
};
//round-1
var createGeneralPost = function(postObj, req, res) {
	var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType','postUnderGroupId','content']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['content']);
	//TODO: perform image validation.
	postObj.general = [{ content: postObj.content}];
	postObj.postBy = req.user._id;
	post = new Post(postObj);

	var imageIds = postObj.imageIds;

	//update all images for post.
	if(imageIds.length > 0){
		async.forEachLimit(imageIds, 3, function(imageId, callback) {
			Image.findByIdAndUpdate(imageId, {used: true}, function(err){
				if (err) return callback(err)
				callback();
			});
		}, function(err) {
			if (err) return res.json(err);
			return savePost(post, res);
		});
	} else {
		return savePost(post, res);
	}

};
//round-1
var createTestimonyPost = function(postObj, req, res) {
	var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType','postUnderGroupId','content', 'title']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['content', 'title']);
	//TODO: perform image validation.
	postObj.testimony = [{ title: postObj.title, content: postObj.content}];
	postObj.postBy = req.user._id;
	post = new Post(postObj);

	var imageIds = postObj.imageIds;

	//update all images for post.
	if(imageIds.length > 0){
		async.forEachLimit(imageIds, 3, function(imageId, callback) {
			Image.findByIdAndUpdate(imageId, {used: true}, function(err){
				if (err) return callback(err)
				callback();
			});
		}, function(err) {
			if (err) return res.json(err);
			return savePost(post, res);
		});
	} else {
		return savePost(post, res);
	}
};

var createEventPost = function (postObj, req, res) {
	var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['postUnderGroupType','postUnderGroupId','title', 'description', 'fromDate', 'toDate', 'where','hostBy','invitees']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
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
	event.save(function(err){
		if (err) return res.json(err);
		var imageIds = postObj.imageIds;

		var post = new Post({
			postType: postObj.postType,
			postBy: req.user._id,
			eventId: event._id,
			postUnderGroupType: postObj.postUnderGroupType,
			postUnderGroupId: postObj.postUnderGroupId
		});
		//update all images for event post.
		if(imageIds.length > 0){
			async.forEachLimit(imageIds, 3, function(imageId, callback) {
				Image.findByIdAndUpdate(imageId, {used: true}, function(err){
					if (err) return callback(err)
					callback();
				});
			}, function(err) {
				if (err) return res.json(err);
				post.imageIds = imageIds;
				return savePost(post, res);
			});
		} else {
			return savePost(post, res);
		}
	});
};

var canUserOperateOnThisPostUnder = function(user, groupType, groupId, action) {
	groupType = groupType + "s";
	return (user[groupType].indexOf(groupId) !== -1);
};
/* Request Fields Description:
{
	postUnderGroupId: (string-fellowship._id) required,
	postUnderGroupType: (string) required,
	postType: (string) required ['general','testimony','question','prayer','event'],
	content: (string) required if postType == general || testimony || question || prayer,
	title: (string) required if postType == testimony || event,
	imageIds: [string-image._id] optional for postType == event || general || testimony,
	links: [string] optional for postType == event,
	description: (string) required for postType == event,
	fromDate: (date object) required for postType == event,
	toDate: (date object) required for postType == event,
	where: (string) required for postType == event,
	hostBy: (string-user._id) required for postType == event,
	banner: (string-image._id) optional for postType == event,
	invitees: [string-user._id] required for postType == event
}
*/
exports.createPost=function (req, res) {
	var postObj = req.body;
	if(!commFunc.isGroupMember(postObj.postUnderGroupType, req.user, postObj.postUnderGroupId)) {
		return res.json({status: "fail", message: "you are not allowed to create post on this wall which you're not a member of."});
	}

	postObj = deleteKey(postObj, ['comments','updatedOn', 'postBy']);
	if(_.has(postObj,'postType')){
		if(postObj.postType === 'question') {
			return createQuestionPost(postObj, req, res);
		}
		if(postObj.postType === 'prayer') {
			return createPrayerPost(postObj, req, res);
		}
		if(postObj.postType === 'general') {
			return createGeneralPost(postObj, req, res);
		}
		if(postObj.postType === 'testimony') {
			return createTestimonyPost(postObj, req, res);
		}
		if(postObj.postType === 'event'){
			return createEventPost(postObj, req, res);
		}
	}
};

exports.getPost=function (req, res) {
	Post.findById(req.params.id).populate('eventId').exec(function(err, post){
		console.log("post");
		console.log(post);
		if (err) return res.json(err);
		if(!commFunc.isGroupMember(post.postUnderGroupType.toString(), req.user, post.postUnderGroupId.toString())) {
			return res.json({status: "fail", message: "you are not allowed to get post on this wall which you're not a member of."});
		}
		return res.json(post);
	});
};

//get Round-1
exports.queryPost=function (req, res) {
	var postObj = req.query;
	var errors = checkRequiredFields(postObj, ['postUnderGroupType', 'postUnderGroupId']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
	}
	if(!commFunc.isGroupMember(postObj.postUnderGroupType, req.user, postObj.postUnderGroupId)) {
		return res.json({status: "fail", message: "you are not allowed to query posts on this wall which you're not a member of."});
	}

	var validKeys = ['postType', 'postBy', 'postUnderGroupType', 'postUnderGroupId'];
	var actualKeys = _.keys(req.query);
	var filteredKeys = _.intersection(validKeys, actualKeys);

	var condition = {};
	var whereClause = {};
	_.forEach(filteredKeys, function(key){
		if(key == 'postUnderGroupType') {
			whereClause.postUnderGroupType = req.query[key];
		} else if (key == 'postUnderGroupId') {
			whereClause.postUnderGroupId = req.query[key];
		} else {
			condition[key] = req.query[key];
		}
	});
	console.log(whereClause);
	Post.find(condition).where(whereClause).exec(function(err,posts) {
		if (err) return res.json(err);
		return res.json(posts);
	});
};

var _updatePost = function(id, userId, postObj, res) {
	Post.findOneAndUpdate({_id: id, postBy: userId}, postObj, function(err, post){
		if (err) return res.json(err);
		return res.json(post);
	});
};
//put . need to provide postType
exports.updatePost=function (req, res) {
	var postObj = req.body;

	postObj = deleteKey(postObj, ['comments','updatedOn', 'postBy']);
	if(_.has(postObj,'postType')){
		if(postObj.postType === 'question') {
			var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['content']);
			if(errors.length > 0){
				return res.json({statue:"failed", errors: errors});
			}
			delete postObj.postType;
			postObj = stripHtmlforFields(postObj, ['content']);
			postObj.question = postObj.content;
			postObj.updatedOn = new Date();
			return _updatePost(req.params.id, req.user._id, postObj, res);
		}
		if(postObj.postType === 'prayer') {
			var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['content']);
			if(errors.length > 0){
				return res.json({statue:"failed", errors: errors});
			}
			delete postObj.postType;
			postObj = stripHtmlforFields(postObj, ['content']);
			postObj.prayer = postObj.content;
			postObj.updatedOn = new Date();
			return _updatePost(req.params.id, req.user._id, postObj, res);
		}
		if(postObj.postType === 'general') {
			var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['content']);
			if(errors.length > 0){
				return res.json({statue:"failed", errors: errors});
			}
			delete postObj.postType;
			postObj = stripHtmlforFields(postObj,['content']);
			postObj.general = {
				content : postObj.content
			}
			post = new Post(postObj);
			Post.findOne({_id: req.params.id , postBy: req.user._id}).exec(function(err, post){
				var general = post.general[0];
				general.content = postObj.content;
				return savePost(post, res);
			});
		}
		if(postObj.postType === 'testimony') {
			var errors = checkRequiredFieldsForPostType(postObj.postType, postObj, ['content', 'title']);
			if(errors.length > 0){
				return res.json({statue:"failed", errors: errors});
			}
			delete postObj.postType;
			postObj = stripHtmlforFields(postObj, ['content', 'title']);
			postObj.testimony = {
				title : postObj.title,
				content : postObj.content
			};
			post = new Post(postObj);
			Post.findOne({_id: req.params.id , postBy: req.user._id}).exec(function(err, post){
				var testimony = post.testimony[0];
				testimony.title = postObj.title;
				testimony.content = postObj.content;
				return savePost(post, res);
			});
		}
		if(postObj.postType === 'event'){
			delete postObj.postType;
			Post.findOne({_id: req.params.id , postBy: req.user._id}).exec(function(err, post){
				if (err) return res.json(err);
				var validKeys = ['albumId', 'imageIds', 'title', 'description', 'fromDate', 'toDate', 'where', 'banner'];
				var actualKeys = _.keys(req.body);
				var filteredKeys = _.intersection(validKeys, actualKeys);
				var event = {};
				console.log(filteredKeys);
				_.forEach(filteredKeys, function(key){
					event[key] = req.body[key];
				});

				console.log("event");
				console.log(req.body);
				console.log(event);
				console.log(post);
				Event.findOneAndUpdate({_id: post.eventId}, event, function(err, NumberUpdated, raw){
					if (err) return res.json(err);
					console.log("jaidofjpaosidjfa");
					console.log(NumberUpdated);
					console.log(post);
					Post.populate(post, 'eventId general testimony', function(err, post){
						if (err) return res.json(err);
						return res.json(post);
					});
				});
			});
		}
	}
};

// Round 1
exports.removePost=function (req, res) {

	Post.where().findOneAndRemove({_id: req.params.id, postBy: req.user._id}, function(err){
		if (err) return res.json(err);
		return res.json({status: req.params.id + "removed successfully."});
	});
};

/*---Comment related-----*/
exports.addCommentToPost=function (req, res) {
	Post.findById(req.params.post_id).exec(function(err, post){
		if (err) return res.json(err);
//		if(!canUserOperateOnThisPostUnder(req.user, post.postUnderGroupType, post.postUnderGroupId)) {
//			return res.json({status: "fail", message: "you are not allowed to add comment to post to this wall which you're not a member of."});
//		}
		if(!commFunc.isGroupMember(post.postUnderGroupType.toString(), req.user, post.postUnderGroupId.toString())) {
			return res.json({status: "fail", message: "you are not allowed to create post on this wall which you're not a member of."});
		}
		commentObj = req.body;
		errors = checkRequiredFields(commentObj, ['comment']);
		if(errors>0) return res.json(errors);
		commentObj = {
			userId:	req.user._id,
			comment: html_strip.html_strip(commentObj.comment, htmlStripOptions),
			profileImg: req.user.profileImg,
			firstName: req.user.firstName,
			lastName: req.user.lastName
		};
		post.comments.push(commentObj);
		return savePost(post, res);
	});
};

exports.updateCommentFromPost=function (req, res) {
	Post.findById(req.params.post_id).exec(function(err, post){
		if (err) return res.json(err);
		commentObj = req.body;
		errors = checkRequiredFields(commentObj, ['comment']);
		if(errors>0) return res.json(errors);
//		if(!canUserOperateOnThisPostUnder(req.user, post.postUnderGroupType, post.postUnderGroupId)) {
//			return res.json({status: "fail", message: "you are not allowed to update comment to post to this wall which you're not a member of."});
//		}
		if(!commFunc.isGroupMember(post.postUnderGroupType.toString(), req.user, post.postUnderGroupId.toString())) {
			return res.json({status: "fail", message: "you are not allowed to create post on this wall which you're not a member of."});
		}
		var comment = post.comments.id(req.params.comment_id);
		console.log('chk comment.userId.toString()');
		console.log(comment.userId.toString());
		console.log('chk req.user._id.toString()');
		console.log(req.user._id.toString());
		if(comment.userId.toString() === req.user._id.toString()) {
			commentObj = req.body;
			comment.comment = html_strip.html_strip(commentObj.comment, htmlStripOptions);
			comment.updatedOn = new Date();
		} else {
			return res.json({status: "you are not allowed to modify the comment of not yours."});
		}
		return savePost(post, res);
	});
};

exports.deleteCommentFromPost=function (req, res) {
	Post.findById(req.params.post_id).exec(function(err, post){
		var comment = post.comments.id(req.params.comment_id);
		if(comment.userId.toString() === req.user._id.toString()) {
			comment.remove();
		} else {
			return res.json({status: "you are not allowed to remove the comment of not yours."});
		}
		return savePost(post, res);
	});
};
