/*************************************************************************************
 11.18.2014 re-create Image model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var commentSchema=require('./Comment').commentSchema;

var imageSchema = mongoose.Schema({
	images:		[{type: String, Required:'(images) is required', index: true, unique: false}],
	caption:	{type: String, index: false, unique: false},
	createdOn:	[{type: Date, Required:'(createdOn) is required', index: true, unique: false}],
	comments: 	[commentSchema]
});

var Image = mongoose.model('Image',imageSchema);
