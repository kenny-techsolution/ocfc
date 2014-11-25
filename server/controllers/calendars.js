var Calendar = require('mongoose').model('Calendar'),
	Event = require('mongoose').model('Event'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	_=require('lodash');//Library for Array

var handleError= function(err){
	var modError = err;
	return modError;
};

//Post
exports.createCalendar= function (req, res) {
	var calendar = req.body;
	calendar.ownerType=calendar.ownerType;
	calendar.title=calendar.title;
	calendar.createdBy=req.user.id;

	var calendar = new Calendar(calendar);
	calendar.save(function (err) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",calendar:calendar});
	})
};
//Get
exports.getCalendar= function (req, res) {
	Calendar.findOne({_id:req.params.id}).exec(function(err,calendar){
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",calendar:calendar});
	});
};
//Get
exports.queryCalendars= function (req, res) {
	var validKeys = ["ownerType","title"];
	var actualKeys = _.keys(req.query);
	var filteredKeys = _.intersection(validKeys, actualKeys);
	var condition = {};
	_.forEach(filteredKeys, function(key){
		//Grab value for each key
		condition[key] = req.query[key];
	})
	Calendar.find(condition).exec(function (err, queryCalendar) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",queryCalendar:queryCalendar});
	});
};
//Put
exports.updateCalendar= function (req, res) {
	var calendar=req.body;
	calendar = deleteKey(calendar, ['fellowshipId', 'churchId','eventIds','createdOn','updatedOn','createdBy']);

	var keys = _.keys(calendar);

	if(keys.length==1 && keys[0]=='_id'){
		return res.json({});
	}

	Calendar.update({ _id:req.params.id }, calendar, { multi: true }, function (err, numberAffected, raw) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",raw:raw});
	});
};
//Delete
exports.deleteCalendar= function (req, res) {
	Calendar.count({createdBy:req.user._id,_id:req.params.id},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		console.log('chk count');
		console.log(count);

		if (count>0){
			Calendar.remove({_id:req.params.id},function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status: "successfully removed from Calendar"});
			})
		}
	});
};
//Post
exports.createEventToCalendar= function (req, res) {
	var event=req.body;
	event=new Event(event);
	event.fromDate=new Date();
	event.toDate=new Date();
	event.hostBy=req.user._id;
	console.log('chk event');
	console.log(event);

	//TODO make sure user can post to this album
	event.save(function(err){
		if(err){
			err=handleError(err);
			return res.json(err);
			console.log('chk err');
			console.log(err);
		}
		console.log("event");
		console.log(event);
		Calendar.findById(req.params.calendar_id).exec(function(err, calendarEvent){
			calendarEvent.eventIds.push(event._id);

			console.log('chk calendarEvent.eventIds');
			console.log(calendarEvent.eventIds);

			calendarEvent.save(function(err){
				if(err) {
					err = handleError(err);
					return res.json(err);
				}
				console.log('chk calendarEvent');
				console.log(calendarEvent);
				return res.json({status:'success',calendarEvent:calendarEvent})
			});
		});
	});
};
//Get
exports.queryEventsFromCalendar= function (req, res) {
	var validKeys = ["description","fromDate",'where'];
	var actualKeys = _.keys(req.query);
	var filteredKeys = _.intersection(validKeys, actualKeys);
	var condition = {};
	_.forEach(filteredKeys, function(key){
		//Grab value for each key
		condition[key] = req.query[key];
	});
	Calendar.findById(req.params.calendar_id).exec(function(err,queryCalendarEvents) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		console.log('chk queryCalendarEvents');
		console.log(queryCalendarEvents);
		return res.json({status:"success",queryCalendarEvents:queryCalendarEvents});
	});
};
