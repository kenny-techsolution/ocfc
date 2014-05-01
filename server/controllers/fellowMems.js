var FellowMem=require('mongoose').model('FellowMem');
var mongoose = require('mongoose');

exports.createFellowMem=function(req,res,next){
    var fellowMemData=req.body;
    fellowMemDoc = {
        "member" : mongoose.Types.ObjectId(fellowMemData.userId),
        "fellowship" : mongoose.Types.ObjectId(fellowMemData.fellowId),
        "status": "Pending",
        "signupDate": new Date()
    };
    FellowMem.create(fellowMemDoc, function(err,fellowMem){
        if(err){
            console.log("this is error log");
            console.log(err);
            if(err.toString().indexOf('E11000')>-1){
                err=new Error("Duplicate fellowMem");
                console.log("haah");

            }
            console.log("duplicate /////");
            console.log(err);
            res.status(400);
            var err_message = err.toString();
            return res.send({reason:err_message});
        }
        res.send({status:"success", fellowMemId: fellowMem._id});
    });
};

exports.getFellowsByUser= function(req,res){
    var userId=req.query.userId;
    console.log("userId");
    console.log(userId);
    FellowMem.find({member:userId}).exec(function(err,collection){
        res.send(collection);
    })
};