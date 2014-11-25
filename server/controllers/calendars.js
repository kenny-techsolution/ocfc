var Calendar = require('mongoose').model('Calendar'),
	Event = require('mongoose').model('Event'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	_=require('lodash');//Library for Array

//Post
exports.createCalendar= function (req, res) {
	var calendar = req.body;
	calendar.ownerType=calendar.ownerType;
	calendar.title=calendar.title;
	calendar.createdBy=commFunc.reqSessionUserId(req);
	calendar = new Calendar(calendar);

	calendar.save(function (err) {
		if (err) return res.json(err);
		return res.json({status:"success",calendar:calendar});
	})
};
//Get
exports.getCalendar= function (req, res) {
	Calendar.findOne({_id:commFunc.reqParamId(req,'id')}).exec(function(err,calendar){
		if (err) return res.json(err);
		return res.json({status:"success",calendar:calendar});
	});
};
//Get
exports.queryCalendars= function (req, res) {
	var validKeys=commFunc.removeInvalidKeys(req.query,['ownerType','title']);
	Calendar.find(validKeys).exec(function (err, queryCalendar) {
		if (err) return res.json(err);
		return res.json({status:"success",queryCalendar:queryCalendar});
	});
};

//Put
exports.updateCalendar= function (req, res) {
	var calendar=commFunc.removeInvalidKeys(req.query,['ownerType','title']);
	Calendar.update({ _id:commFunc.reqParamId(req,'id')}, calendar, { multi: true }, function (err, numberAffected, raw) {
		if (err) return res.json(err);
		return res.json({status:"success",raw:raw});
	});
};

//Delete
exports.deleteCalendar= function (req, res) {
	Calendar.findOneAndRemove({createdBy: commFunc.reqSessionUserId(req), _id: commFunc.reqParamId(req,'id')}, function (err) {
		if (err) return res.json(err);
		return res.json({status: "successfully removed from Calendar"});
	});
};

//Post
exports.createEventToCalendar= function (req, res) {
	var event=req.body;
	event=new Event(event);
	event.fromDate=new Date();
	event.toDate=new Date();
	event.hostBy=commFunc.reqSessionUserId(req);

	//TODO make sure user can post to this album
	event.save(function(err){
		if(err) return res.json(err);

		Calendar.findById(commFunc.reqParamId(req,'calendar_id')).exec(function(err, calendarEvent){
			calendarEvent.eventIds.push(event._id);
			calendarEvent.save(function(err){
				if(err) return res.json(err);
				return res.json({status:'success',calendarEvent:calendarEvent})
			});
		});
	});
};
//Get
exports.queryEventsFromCalendar= function (req, res) {
	var calendar=commFunc.removeInvalidKeys(req.query,['ownerType','title']);
	Calendar.findById(commFunc.reqParamId(req,'calendar_id'),calendar).exec(function(err,queryCalendarEvents) {
		if (err) return res.json(err);
		return res.json({status:"success",queryCalendarEvents:queryCalendarEvents});
	});
};
