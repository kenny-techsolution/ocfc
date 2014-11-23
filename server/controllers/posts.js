var Post = require('mongoose').model('Post'),
	Event = require('mongoose').model('Event'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	html_strip=require('htmlstrip-native');

var checkRequiedFieldsForPostType = function (postType, obj, fields) {
	var errors = []
	_.forEach(fields, function(key){
		if(!_.has(obj, key)){
			errors.push(key + " is required field for postType=" + postType);
		}
		return errors;
	});
};

var checkRequiedFields = function (obj, fields) {
	var errors = []
	_.forEach(fields, function(key){
		if(!_.has(obj, key)){
			errors.push(key + " is required field.");
		}
		return errors;
	});
};

var htmlStripOptions = {
	include_script : false,
	include_style : false,
	compact_whitespace : true
};

var stripHtmlforFields = function (obj, fields) {
	_.forEach(fields, function(key){
		obj[key] = html_strip.html_strip(obj[key], htmlStripOptions);
	});
	return obj;
};

var savePost = function(post) {
	post.save(function(err){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		Post.populate(post, 'eventId general testimony', function(err, post){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json(post);
		});
	});
};

var createQuestionPost = function(postObj) {
	var errors = checkRequiedFieldsForPostType(postObj.postType, postObj, ['content']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['content']);
	//TODO: perform image validation.
	post = new Post(post);
	return savePost(post);
};

var createPrayerPost = function(postObj) {
	var errors = checkRequiedFieldsForPostType(postObj.postType, postObj, ['content']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['content']);
	//TODO: perform image validation.
	post = new Post(post);
	return savePost(post);
};

var createGeneralPost = function(postObj) {
	var errors = checkRequiedFieldsForPostType(postObj.postType, postObj, ['content']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
	}
	postObj = stripHtmlforFields(postObj, ['content']);
	//TODO: perform image validation.
	post = new Post(postObj);
	post.save(function(err){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		post.general.push({
			content: postObj.content,
			imagesIds: postObj.imagesIds || []
		});
		post.save(function(err){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json(post);
		});
	});
};

var createTestimonyPost = function(postObj) {
	var errors = checkRequiedFieldsForPostType(post.postType, post, ['content', 'title']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
	}
	post = stripHtmlforFields(post, ['content', 'title']);
	//TODO: perform image validation.
	post = new Post(postObj);
	post.save(function(err){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		post.testimony.push({
			title: postObj.title,
			content: postObj.content,
			imagesIds: postObj.imagesIds || []
		});
		return savePost(post);
	});
}

var createEventPost = function (postObj) {
	var errors = checkRequiedFieldsForPostType(post.postType, post, ['title', 'description', 'fromDate', 'toDate', 'where','hostBy','invitees']);
	if(errors.length > 0){
		return res.json({statue:"failed", errors: errors});
	}
	post = stripHtmlforFields(post, ['title', 'description', 'where']);
	//TODO: perform image validation.
	event = new Event({
		title: postObj.title,
		imagesIds: postObj.imagesIds || [],
		description: postObj.description,
		fromDate: postObj.fromDate,
		toDate: postObj.toDate,
		where: postObj.where,
		hostBy: req.user._id,
		invitees: postObj.invitees
	});
	event.save(function(err){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		post = new Post({
			postType: Post.postTypeSetter(postObj.postType),
			postBy: req.user._id,
			eventId: event._id
		});
		return savePost(post);
	});
}

/* Request Fields Description:
{
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
	//TODO: post by the user must be the member of the walls. implement that in the user req user obj.
	postObj = deleteKey(postObj, ['comments','updatedOn', 'postBy']);
	if(_.has(postObj,'postType')){
		if(postObj.postType === 'question') {
			return createQuestionPost(postObj);
		}
		if(postObj.postType === 'prayer') {
			return createPrayerPost(postObj);
		}
		if(postObj.postType === 'general') {
			return createGeneralPost(postObj);
		}
		if(post.postType === 'testimony') {
			return createTestimonyPost(postObj);
		}
		if(post.postType === 'event'){
			return createEventPost(postObj);
		}
	}
};

exports.getPost=function (req, res) {
	Post.findById(req.params._id).populate('eventId').exec(function(err, post){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json(post);
	});
};

exports.queryPost=function (req, res) {
	var validKeys = ['postType', 'postBy'];
	var actualKeys = _.keys(req.query);
	var filteredKeys = _.intersection(validKeys, actualKeys);
	var condition = {};
	_.forEach(filteredKeys, function(key){
		condition[key] = req.query[key];
	});
	Post.find(condition, function(err, posts){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json(posts);
	});
};

var _updatePost = function(id, postObj) {
	Post.findOneAndUpdate({_id: id}, postObj, function(err){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status: "post updated successful"});
	});
};

exports.updatePost=function (req, res) {
	var postObj = req.body;
	//TODO: post by the user must be the member of the walls. implement that in the user req user obj.
	postObj = deleteKey(postObj, ['comments','updatedOn', 'postBy']);
	if(_.has(postObj,'postType')){
		if(postObj.postType === 'question') {
			var errors = checkRequiedFieldsForPostType(postObj.postType, postObj, ['content']);
			if(errors.length > 0){
				return res.json({statue:"failed", errors: errors});
			}
			postObj = stripHtmlforFields(postObj, ['content']);
			postObj.updatedOn = new Date();
			return _updatePost(req.params.id, postObj);
		}
		if(postObj.postType === 'prayer') {
			var errors = checkRequiedFieldsForPostType(postObj.postType, postObj, ['content']);
			if(errors.length > 0){
				return res.json({statue:"failed", errors: errors});
			}
			postObj = stripHtmlforFields(postObj, ['content']);
			postObj.updatedOn = new Date();
			return _updatePost(req.params.id, postObj);
		}
		if(postObj.postType === 'general') {
			var errors = checkRequiedFieldsForPostType(postObj.postType, postObj, ['content']);
			if(errors.length > 0){
				return res.json({statue:"failed", errors: errors});
			}
			postObj = stripHtmlforFields(postObj, ['content']);
			post = new Post(postObj);
			Post.findById(req.params.id).exec(function(err, post){
				var general = post.general[0];
				general.content = postObj.content;
				return savePost(post);
			});
		}
		if(post.postType === 'testimony') {
			var errors = checkRequiedFieldsForPostType(postObj.postType, postObj, ['content', 'title']);
			if(errors.length > 0){
				return res.json({statue:"failed", errors: errors});
			}
			postObj = stripHtmlforFields(postObj, ['content', 'title']);
			post = new Post(postObj);
			Post.findById(req.params.id).exec(function(err, post){
				var testimony = post.testimony[0];
				testimony.title = postObj.title;
				testimony.content = postObj.content;
				return savePost(post);
			});
		}
		if(post.postType === 'event'){
			Post.findById(req.params.id, 'eventId').exec(function(err, post){
				if (err) {
					err = handleError(err);
					return res.json(err);
				}
				var validKeys = ['albumId', 'imageIds', 'title', 'description', 'fromDate', 'toDate', 'where', 'banner'];
				var actualKeys = _.keys(req.params);
				var filteredKeys = _.intersection(validKeys, actualKeys);
				var event = {};
				_.forEach(filteredKeys, function(key){
					event[key] = req.params[key];
				});
				Event.update({_id: post.eventId}, event, function(err, NumberUpdated, raw){
					if (err) {
						err = handleError(err);
						return res.json(err);
					}
					Post.populate(post, 'eventId general testimony', function(err, post){
						if (err) {
							err = handleError(err);
							return res.json(err);
						}
						return res.json(post);
					});
				});
			});
		}
	}
};

exports.removePost=function (req, res) {
	Post.findOneAndRemove({_id: req.params.id, postBy: req.user._id}, function(err){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status: req.params.id + "removed successfully."});
	});
};

/*---Comment related-----*/
exports.addCommentToPost=function (req, res) {
	//TODO: check if user is belonged to that wall.
	Post.findById(req.params.id).exec(function(err, post){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		commentObj = req.body;
		errors = checkRequiedFields(commentObj, ['comment']);
		if(errors>0) return res.json(errors);
		commentObj = {
			userId:	req.user._id,
			comment: html_strip.html_strip(commentObj.comment, htmlStripOptions),
			profileImg: req.user.profileImg,
			firstName: req.user.firstName,
			lastName: req.user.lastName
		};
		post.comments.push(commentObj);
		return savePost();
	});
};

exports.updateCommentFromPost=function (req, res) {
	Post.findById(req.params.post_id).exec(function(err, post){
		errors = checkRequiedFields(commentObj, ['comment']);
		if(errors>0) return res.json(errors);

		var comment = post.comments.id(req.params.comment_id);
		if(comment.userId === req.user._id) {
			commentObj = req.body;
			comment.comment = html_strip.html_strip(commentObj.comment, htmlStripOptions);
			comment.updatedOn = new Date();
		} else {
			return res.json({status: "you are not allowed to modify the comment of not yours."});
		}
		return savePost(post);
	});
};

exports.deleteCommentFromPost=function (req, res) {
	Post.findById(req.params.post_id).exec(function(err, post){
		var comment = post.comments.id(req.params.comment_id);
		if(comment.userId === req.user._id) {
			comment.remove();
		} else {
			return res.json({status: "you are not allowed to remove the comment of not yours."});
		}
		return savePost(post);
	});
};
