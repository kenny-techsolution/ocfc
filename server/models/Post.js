/*************************************************************************************
 5.24.2014 added to post text
 ***************************************************************************************/

var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;

//mongoose.Schema.Types.ObjectId
//type: 0 for Post, 1 fo Question
//visibility: 0 for Public, 1 for Church Lvl, 2 for World Lvl
var postSchema = mongoose.Schema({
    user_object_id:{type:ObjectId, ref: 'User', unique: false, required:'(MEMBER) is required!'},
    content:{type:String,required:'(content) is required!',unique:false},
    type:{type:Number,required:'(type) is required!',unique:false},
    visibility:{type:Number,required:'(visibility) is required!',unique:false},
    postDate:{type:Date, required:'(postdate) is required!','default': Date.now, unique:false}
});

var Post=mongoose.model('Post', postSchema);

