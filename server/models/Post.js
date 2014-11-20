/*************************************************************************************
 11.18.2014 re-create Post model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var commentSchema=require('./Comment').commentSchema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var testimonySchema = mongoose.Schema({
	title:{type: String, Required:'(title) is required!',index: false, unique: false,lowercase: true},
	story: {type: String, Required:'(story) is required!',index: false, unique: false,lowercase: true},
	imageIds:[{type: ObjectId,ref:'Image',index: false, unique: false,lowercase: true}]
});

var postSchema = mongoose.Schema({
	comments:		[commentSchema],
	testimony:		[testimonySchema],
	wallId:			[{type: ObjectId, ref:'wallId', index: true, unique: false}],
	question:		{type: String, index: false, unique: false},
	prayer:			{type: String, index: false, unique: false},
	eventId:		{type: ObjectId, ref:'Event', index: false, unique: false},
	general:		{type: String, Required:'(general), is required!', index: false, unique: false},
	postBy:			{type: ObjectId, ref:'User', Required:'(postBy), is required!', index: true, unique: false},
	postType:		{type: String, Required:'(postType), is required!', index: true, unique: false},
	createdOn:		{type: Date, Required:'(createdOn), is required!', index: true, unique: false},
	updatedOn:		{type: Date, Required:'(updatedOn), is required!',index: true, unique: false}
});

var Post = mongoose.model('Post', postSchema);