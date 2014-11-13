/*************************************************************************************
 7.3.2014 added to capture Calendar
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

//mongoose.Schema.Types.ObjectId
//type: 0 for Post, 1 fo Question
//visibility: 0 for Public, 1 for Church Lvl, 2 for World Lvl
var calendarSchema = mongoose.Schema({
	fellow_object_id: {type: ObjectId, ref: 'Fellow', unique: false, required: '(FELLOWSHIP) is required!'},
	event_object_id: {type: ObjectId, ref: 'Event', unique: false, required: '(EVENT) is required!'},
	visibility: [
		{type: ObjectId, ref: 'GROUP', unique: false, required: '(GROUP) is required!'}
	],
	user_object_id: {type: ObjectId, ref: 'User', unique: false, required: '(User ID) is required!'},
	calendar_name: {type: String, required: '(calendar_name) is required!', unique: false},
	events: [],
	created_on: {type: Date, required: '(created_on) is required!', 'default': Date.now, unique: false},
	updated_on: {type: Date, required: '(updated_on) is required!', 'default': Date.now, unique: false}

});

var Calendar = mongoose.model('Calendar', calendarSchema);

