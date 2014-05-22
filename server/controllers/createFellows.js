/*************************************************************************************
 5.12.2014, create getCreateFellow object that adds data to mongodb by zipcode
 ***************************************************************************************/

var Fellow=require('mongoose').model('Fellow'),
commFunc=require('../utilities/commonFunctions');


exports.createFellow=function(req,res){
    var fellowData=req.body;
    var fellowDoc = {
        "name": commFunc.toProperCase(fellowData.fellowName),
        "zipcode": fellowData.zipcode,
        "status": fellowData.status
    };

    Fellow.create(fellowDoc, function(err,fellow){
        if(err){
            if(err.toString().indexOf('E11000')>-1){
                err=new Error("Duplicate createFellow");}
            res.status(400);
            var err_message = err.toString();
            return res.send({reason:err_message});
        }
        res.send({status:"success", fellow: fellow});
    });

};

//5.15.2014, created this to update Role in Users model as 'admin'
exports.queryFellow = function (req,res){
    cl("test exports.queryFellow function if called");
    if (req.query._id){
        Fellow.find({_id:req.query._id}).populate("_id").exec(function(err,collection){
            console.log(collection);
            collection.roles="admin";
            cl("test collection.roles",collection.roles);
            res.json(collection);
        });
    }
};