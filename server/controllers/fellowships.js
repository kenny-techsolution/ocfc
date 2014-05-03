/*************************************************************************************
 4.29.2014, create getFellowByZip object that grabs data from mongodb by zipcode
 ***************************************************************************************/

var Fellow=require('mongoose').model('Fellow');

//find doc by zipcode from URL within Fellow collection
exports.getFellows=function(req,res){
    if(req.query.zip){
        //by zipcode
        Fellow.find({zipcode:req.query.zip}, null, {}, function (err, fellows){
            if (!err) {
                console.log(fellows);
                res.send(fellows);
            }else{
                res.status(404);
            }
        });
    } else {
        //by all fellowships
        Fellow.find({}, null, {}, function (err, fellows){
            if (!err) {
                console.log(fellows);
                res.send(fellows);
            }else{
                res.status(404);
            }
        });

    }

};
