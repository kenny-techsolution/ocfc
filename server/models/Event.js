/*************************************************************************************
 5.24.2014 added to post text
 ***************************************************************************************/

var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;

//11.6.2014 creating event schema
var eventSchema = mongoose.Schema({

	/*EVENT Specific*/
	from_date:{type:Date,unique:false},
	from_date_time:{type:Date,unique:false},
	to_date:{type:Date,unique:false},
	to_date_time:{type:Date,unique:false},
	where:{type:String,unique:false},
	welcome:{type:String,unique:false},
	title:{type:String,unique:false}

});

var Event=mongoose.model('Event', eventSchema);
