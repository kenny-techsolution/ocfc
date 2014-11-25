var Event = require('mongoose').model('Event'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	_=require('lodash'),
	html_strip=require('htmlstrip-native');


var handleError= function(err){
	var modError = err;
	return modError;
};

var checkRequiredFields = function (obj, fields) {
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

//Get
exports.getEvent= function (req, res) {
	Event.findOne({_id:req.params.event_id}).exec(function(err,event){
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",event:event});
	});
};

//Put
exports.updateEvent= function (req, res) {
	var event=req.body;
	event = deleteKey(event, ['albumId', 'hostBy','eventIds']);

	var keys = _.keys(event);

	if(keys.length==1 && keys[0]=='_id'){
		return res.json({});
	}

	Event.update({ _id:req.params.event_id }, event, { multi: true }, function (err, numberAffected, raw) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",raw:raw});
	});
};
//Delete
exports.deleteEvent= function (req, res) {
	Event.count({hostBy:req.user._id,_id:req.params.event_id},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		console.log('chk count');
		console.log(count);

		if (count>0){
			Event.remove({_id:req.params.event_id},function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status: "successfully removed from Event"});
			})
		}
	});
};
//Post
exports.addCommentToEvent= function (req, res) {
	Event.findById(req.params.event_id).exec(function(err, event){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}

		var comment = req.body;
		errors = checkRequiredFields(comment, ['comment']);
		if(errors>0) return res.json(errors);

		//TODO html_strip is cutting off very last letter in comment
		comment = {
			userId:	req.user._id,
			comment: html_strip.html_strip(comment.comment, htmlStripOptions),
			profileImg: req.user.profileImg,
			firstName: req.user.firstName,
			lastName: req.user.lastName
		};
		event.comments.push(comment);
		event.save(function(){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json({status: "success",event:event});
		});
	});
};
//Put
exports.updateCommentFromEvent= function (req, res) {
	var commentObj=req.body;
//	commentObj = toLowerCase(commentObj);
	commentObj = deleteKey(commentObj, ['userId', 'profileImg','firstName','lastName']);

	var keys = _.keys(commentObj);

	if(keys.length==1 && keys[0]=='_id'){
		return res.json({});
	}

	Event.findOne({ _id:req.params.event_id }, function (err, event) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		var comment = event.comments.id(req.params.comment_id);
		comment.comment = commentObj.comment;

		console.log('chk comment');
		console.log(comment);

		event.save(function(err){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json({status:"success",comment:comment});
		});
	});
};
//Delete
exports.deleteCommentFromEvent= function (req, res) {
	Event.findOne({ _id:req.params.event_id }, function (err, event) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		var comment = event.comments.id(req.params.comment_id).remove();

		event.save(function(err){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json({status:"success",comment:comment});
		});
	});
};