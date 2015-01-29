var	Notification=require('mongoose').model('Notification'),
	deleteKey = require('key-del'),
	commFunc = require('../utilities/commonFunctions'),
	_ = require('lodash');//Library for Array

exports.queryNotification=function(req, res){
	console.log('server queryNotification has been called');
	var notification = req.query;

	console.log('chk noteObj query obj');
	console.log(notification);

	var errors = commFunc.checkRequiredFields(notification, ['recipient']);
	console.log('chk errors obj where recipient & message are required fields');
	console.log(errors);

	if (errors.length > 0) {
		console.log('errors.length>0 conditon is met');
		return res.json({statue: "failed", errors: errors});
	}

	var filteredKeys = commFunc.removeInvalidKeys(req.query, ['recipient']);
	var condition = {};
	var whereClause = {};
	console.log('chk filteredKeys obj');
	console.log(filteredKeys);

	console.log('chk req.query.limit value');
	console.log(req.query.limit);

	console.log('chk req.query obj');
	console.log(req.query);

	console.log('chk req.query["postType"] value');
	console.log(req.query['postType']);

	var keys = _.keys(filteredKeys)
	_.forEach(keys, function (key) {
		console.log('chk key obj');
		console.log(key);
		if (key == 'recipient') {
			whereClause.recipient = req.query[key];
		} else {
			condition[key] = req.query[key];
		}
	});

	console.log('chk condition obj');
	console.log(condition);

	console.log('chk whereClause obj');
	console.log(whereClause);
	//01.13.2015 added to populate imageIds
	//01.14.2015 added sort({createdOn: 'descending'})
	Notification.find(condition).sort({createdOn: 'descending'}).limit().where(whereClause).populate('recipient').exec(function (err, notifications) {
		console.log('server Notification.find has been called within queryNotification func');
		console.log('chk notifications array');
		console.log(notifications);
		if (err) return res.json(err);
		return res.json(notifications);
	});

};