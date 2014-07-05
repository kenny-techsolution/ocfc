/*************************************************************************************
 5.24.2014 added to post text
 ***************************************************************************************/

var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;

//5.27.2014, create a sub document called, Comment
var commentSchema = mongoose.Schema({
    comment:{type:String,required:'(comment) is required!',unique:false},
	createdOn:{type:Date, required:'(postdate) is required!','default': Date.now, unique:false},
    user:{type:ObjectId, ref: 'User', unique: false, required:'(MEMBER) is required!'},
    firstName:{type:String,required:'(firstname) is required!',unique:false},
    lastName:{type:String,required:'(lastname) is required!',unique:false}
});

//mongoose.Schema.Types.ObjectId
//type: 0 for Post, 1 fo Question
//visibility: 0 for Public, 1 for Church Lvl, 2 for World Lvl
var postSchema = mongoose.Schema({
	postBy:{type:ObjectId, ref: 'User', unique: false, required:'(User ID) is required!'},
	postType:{type:Number,required:'(post_type) is required!',unique:false},
	createdOn:{type:Date, required:'(created_on) is required!','default': Date.now, unique:false},
	updatedOn:{type:Date,'default': Date.now, unique:false},
	visibility:[{type:ObjectId, ref: 'Group', unique: false,  required:'(GROUP) is required!'}],

	title:{type:String,unique:false},
	content:{type:String,unique:false},
	excerpt:{type:String,unique:false},

	images:[{type:String,unique:false}],
	video:[{type:String,unique:false}],
	audio:[{type:String,unique:false}],
	links:[{type:String,unique:false}],

	//fellow_object_id:{type:ObjectId, ref: 'Fellow', unique: false,  required:'(FELLOWSHIP) is required!'},
	event:{type:ObjectId, ref: 'Event', unique: false},

	comments:[commentSchema]
});

var Post=mongoose.model('Post', postSchema);

console.log("jajajajj");