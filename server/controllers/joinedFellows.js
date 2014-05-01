/*************************************************************************************
 4.30.2014, create store data into mongodb
 ***************************************************************************************/

var JoinedFellow=require('mongoose').model('JoinedFellow');

exports.insertJoinedFellow=function(req,res){
    JoinedFellow.insert({name:req.query.name,zipcode:req.query.zipcode}, null, {}, function (err, JoinedFellow){
        console.log(JoinedFellow);
        res.send(JoinedFellow);
    });
};
