/*************************************************************************************
 11.18.2014 re-create File model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var commentSchema=require('./Comment').commentSchema;

var fileSchema = mongoose.Schema({
	name:		{type: String, Required:'(name) is required!', index: true, unique: false,lowercase: true},
	createdOn:	{type: Date, Required:'(createdOn) is required!', index: true, unique: false,lowercase: true},
	source:		{type: String, Required:'(source) is required!', index: true, unique: false,lowercase: true},
	comments: 	[commentSchema]
});

var File = mongoose.model('File',fileSchema);
