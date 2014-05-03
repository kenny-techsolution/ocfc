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
    console.log("Test content of fellowMemData");
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
    var userId=req.query.userId;
    if(userId){
        FellowMem.find({member:userId}).exec(function(err,collection){
            res.json(collection);
        })
    } else {
        FellowMem.findOne({_id:req.params.id}).exec(function(err,collection){
            res.json(collection);
        })
    }
};

exports.updateFellowMem=function(req,res){
    var fellowMemUpdates=req.body;

//    if(req.user._id !=userUpdates._id && !req.user.hasRole('admin')){
//        res.status(403);
//        return res.end();
//    }
    console.log("what is inside");
    console.log(fellowMemUpdates);
    req.fellowMem.member = fellowMemUpdates.member;
    req.fellowMem.status = fellowMemUpdates.status;
    req.fellowMem.fellowship = fellowMemUpdates.fellowship;
    req.fellowMem.sav
    e(function(err){
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        };
        //sending response back to client.
        res.send(req.fellowMem);
    });
};