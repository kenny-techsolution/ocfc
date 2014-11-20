/*************************************************************************************
 11.18.2014 re-create Calendar model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var calendarSchema = mongoose.Schema({
	ownerType:		{type: String, Required:'(ownerType) is required!', index: true, unique: false,lowercase: true},
	fellowshipId:	{type: ObjectId, ref:'Fellowship', Required:'(fellowshipId) is required!', index: true, unique: false,lowercase: true},
	churchId:		{type: ObjectId, ref:'Church', Required:'(churchId) is required!', index: true, unique: false,lowercase: true},
	eventIds:		[{type: ObjectId, ref:'Event', Required:'(eventId) is required!', index: true, unique: false,lowercase: true}],
	title:			{type: String, Required:'(title) is required!', index: true, unique: false,lowercase: true},
	createdOn:		{type: Date, Required:'(createdOn) is required!', index: true, unique: false,lowercase: true},
	updatedOn:		{type: Date, Required:'(updatedOn) is required!', index: true, unique: false,lowercase: true}
});

var Calendar = mongoose.model('Calendar', calendarSchema);

