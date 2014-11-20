/*************************************************************************************
 11.18.2014 Re-create Fellow model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var commentSchema=require('./Comment').commentSchema;
/*EVENT Specific*/
var eventSchema = mongoose.Schema({
	albumId:		{type: ObjectId, ref:'Album',index: false, unique: false,lowercase: true},
	comments:		[commentSchema],
	imageIds:		[{type: ObjectId, ref:'Image',index: false, unique: false,lowercase: true}],
	links:			[{type: String, index: false, unique: false,lowercase: true}],
	title:			{type: String, Required:'(title) is required!',index: false, unique: false,lowercase: true},
	description:	{type: String, Required:'(description) is required!',index: false, unique: false,lowercase: true},
	fromDate:		{type: Date, Required:'(fromDate) is required!',index: false, unique: false,lowercase: true},
	toDate:			{type: Date, Required:'(toDate) is required!',index: false, unique: false,lowercase: true},
	where:			{type: String, Required:'(where) is required!',index: false, unique: false,lowercase: true},
	hostBy:			{type: ObjectId, ref:'User', Required:'(hostBy) is required!',index: false, unique: false,lowercase: true},
	banner:			{type: String, index: false, unique: false,lowercase: true},
	invitees:		[{type: ObjectId,ref:'User', Required:'(invited) is required!',lowercase: true}],
	gos:			[{type: ObjectId,ref:'User',lowercase: true}],
	noGos:			[{type: ObjectId,ref:'User',lowercase: true}],
	maybes:			[{type: ObjectId,ref:'User',lowercase: true}]
});

var Event = mongoose.model('Event', eventSchema);
