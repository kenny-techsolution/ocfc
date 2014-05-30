/*************************************************************************************
 5.24.2014 added to post text
 ***************************************************************************************/

var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;

//5.27.2014, create a sub document called, Comment
var commentSchema = mongoose.Schema({
    comment:{type:String,required:'(comment) is required!',unique:false},
    postDate:{type:Date, required:'(postdate) is required!','default': Date.now, unique:false},
    user_object_id:{type:ObjectId, ref: 'User', unique: false, required:'(MEMBER) is required!'},
    firstName:{type:String,required:'(firstname) is required!',unique:false},
    lastName:{type:String,required:'(lastname) is required!',unique:false}

});

//mongoose.Schema.Types.ObjectId
//type: 0 for Post, 1 fo Question
//visibility: 0 for Public, 1 for Church Lvl, 2 for World Lvl
var postSchema = mongoose.Schema({
    user_object_id:{type:ObjectId, ref: 'User', unique: false, required:'(MEMBER) is required!'},
    fellow_object_id:{type:ObjectId, ref: 'Fellow', unique: false,  required:'(FELLOWSHIP) is required!'},
    content:{type:String,required:'(content) is required!',unique:false},
    type:{type:Number,required:'(type) is required!',unique:false},
    visibility:{type:Number,required:'(visibility) is required!',unique:false},
    postDate:{type:Date, required:'(postdate) is required!','default': Date.now, unique:false},
    comments:[commentSchema]
});

var Post=mongoose.model('Post', postSchema);

