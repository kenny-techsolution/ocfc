/*************************************************************************************
 5.12.2014, create getCreateFellow object that adds data to mongodb by zipcode
 ***************************************************************************************/

var Fellow=require('mongoose').model('Fellow');
commFunc=require('../utilities/commonFunctions');


exports.createFellow=function(req,res){
    var fellowData=req.body;
    console.log("Create Fellowship");
    console.log(fellowData);

    var fellowDoc = {
        "name": commFunc.toProperCase(fellowData.fellowName),
        "zipcode": fellowData.zipcode,
        "status": fellowData.status
    };

    Fellow.create(fellowDoc, function(err,fellow){
        if(err){
            if(err.toString().indexOf('E11000')>-1){
                console.log("test duplicate createFellow error in createFellow.js");
                console.log(err);
                err=new Error("Duplicate createFellow");}
            res.status(400);
            var err_message = err.toString();
            return res.send({reason:err_message});
        }
        console.log("Fellow.create successfully created in createFellow.js");
        res.send({status:"success", fellow: fellow});
    });

};