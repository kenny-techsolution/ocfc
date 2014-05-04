/*************************************************************************************
 4.30.2014 fellowMems server controller

 Creates the following objects:

 fellowMemData: stores FellowMem records

 create:

 getFellowsByUser: Grab all fellowship records associated to an user

 ***************************************************************************************/

var FellowMem=require('mongoose').model('FellowMem');
var mongoose = require('mongoose');

exports.createFellowMem=function(req,res){
    var fellowMemData=req.body;
    console.log("createFellowMem");
    console.log(fellowMemData);

    var fellowMemDoc = {
        "member": fellowMemData.userId,
        "fellowship": fellowMemData.fellowId,
        "status": "Pending",
        "signupDate": new Date()
    };

    FellowMem.create(fellowMemDoc, function(err,fellowMem){
        if(err){
            if(err.toString().indexOf('E11000')>-1){
                console.log("test duplicate fellowMem error in fellowMems.js");
                console.log(err);
                err=new Error("Duplicate fellowMem");}
            res.status(400);
            var err_message = err.toString();
            return res.send({reason:err_message});
        }
        console.log("FellowMem.create successfully created in fellowMems.js");
        res.send({status:"success", fellowMemId: fellowMem._id});
    });

};

exports.getFellowMem= function(req,res){
    console.log("getFellowMem");
    console.log(req.params);
    FellowMem.findOne({_id:req.params.id}).exec(function(err,collection){
    	console.log("try this");
    	console.log(collection);
        res.json(collection);
    })
};
exports.getFellowMemByUser = function (req,res){
	var userId=req.query.userId;
	console.log("getFellowMemByUser");
	console.log(userId);
    FellowMem.find({member:userId}).exec(function(err,collection){
    	console.log(collection);
        res.json(collection);
    });
};
exports.updateFellowMem=function(req,res){
	return FellowMem.findById(req.params.id, function (err,fellowMem) {
			fellowMem.status = req.body.status;
			return fellowMem.save(function (err) {
			  if (!err) {
			    console.log("updated");
			  } else {
			    console.log(err);
			  }
			  return res.send(fellowMem);
			});
	     });
};