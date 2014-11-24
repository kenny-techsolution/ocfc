/*************************************************************************************
 11.18.2014 re-create Image model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var commentSchema=require('./Comment').commentSchema;

var imageSchema = mongoose.Schema({
	path:		{type: String, Required:'(path) is required', index: true, unique: true},
	caption:	{type: String, index: false, unique: false,lowercase: true},
	createdOn:	[{type: Date, Required:'(createdOn) is required', index: true, unique: false, default:Date.now}],
	comments: 	[commentSchema]
});

var Image = mongoose.model('Image',imageSchema);
