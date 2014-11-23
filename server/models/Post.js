/*************************************************************************************
 11.18.2014 re-create Post model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var commentSchema=require('./Comment').commentSchema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var testimonySchema = mongoose.Schema({
	title:{type: String, Required:'(title) is required!',index: false, unique: false,lowercase: true},
	content: {type: String, Required:'(story) is required!',index: false, unique: false,lowercase: true},
	imageIds:[{type: ObjectId,ref:'Image',index: false, unique: false,lowercase: true}]
});

var generalSchema = mongoose.Schema({
	content:{type: String, Required:'(title) is required!',index: false, unique: false,lowercase: true},
	imageIds:[{type: ObjectId,ref:'Image',index: false, unique: false,lowercase: true}]
});

var postSchema = mongoose.Schema({
	comments:		[commentSchema],
	testimony:		[testimonySchema], //mongoose only allows array for subDocument to be included.
	general:		[generalSchema],
	wallIds:		[{type: ObjectId, ref:'wallId', index: true, unique: false}],
	question:		{type: String, index: false, unique: false},
	prayer:			{type: String, index: false, unique: false},
	eventId:		{type: ObjectId, ref:'Event', index: false, unique: false},
	postBy:			{type: ObjectId, ref:'User', Required:'(postBy), is required!', index: true, unique: false},
	postType:		{type: Number, Required:'(postType), is required!', index: true, unique: false},
	createdOn:		{type: Date, index: true, unique: false, default: Date.now},
	updatedOn:		{type: Date,index: true, unique: false, default: Date.now}
});

var postTypeArray = ['general','testimony','question','prayer','event'];

postSchema.methods = {
	postTypeGetter: function() {
		return postTypeArray[this.postType];
	},
	postTypeSetter: function(val) {
		val.toLowerCase();
		return postTypeArray.indexOf(val);
	}
};

var Post = mongoose.model('Post', postSchema);