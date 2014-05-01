/*************************************************************************************
 4.29.2014, create getFellowByZip object that grabs data from mongodb by zipcode
 ***************************************************************************************/

var Fellow=require('mongoose').model('Fellow');

exports.getFellowByZip=function(req,res){
    Fellow.find({zipcode:req.query.zip}, null, {}, function (err, fellows){
        console.log(fellows);
        res.send(fellows);
    });
};
