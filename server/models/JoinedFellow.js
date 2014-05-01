/*************************************************************************************
 4.29.2014 added to include joined fellowship collection
 ***************************************************************************************/

var mongoose=require('mongoose');

//!!!!!4.30.2014, we should grab the name and zipcode from fellows collection
var joinedFellowSchema = mongoose.Schema({
    name: {type:String, required:'(PATH) is required!'},
    zipcode: {type:String,required:'(PATH) is required!'},
    status:{type:String,required:'(PATH) is required!'}});

var JoinedFellow=mongoose.model('JoinedFellow', joinedFellowSchema);

function createDefaultJoinedFellows(){
    JoinedFellow.find({}).exec(function(err,collection){
        if(collection.length===0){
            JoinedFellow.create({name: 'Timothy Fellowship', zipcode: '12456',status:'Pending'});
            JoinedFellow.create({name: 'Agape Fellowship', zipcode: '78912',status:'Pending'});
            JoinedFellow.create({name: 'Young Adult Fellowship', zipcode: '34567',status:'Approved'});
            JoinedFellow.create({name: 'Abc Fellowship', zipcode: '65432',status:'Approved'});
            JoinedFellow.create({name: 'Def Fellowship', zipcode: '87564',status:'Approved'});
            JoinedFellow.create({name: 'Ghi Fellowship', zipcode: '23574',status:'Approved'});
            JoinedFellow.create({name: 'Jkl Fellowship', zipcode: '57575',status:'Inactive'});
            JoinedFellow.create({name: 'Mno Fellowship', zipcode: '57575',status:'Inactive'});
            JoinedFellow.create({name: 'Pqr Fellowship', zipcode: '33433',status:'Inactive'});
            JoinedFellow.create({name: 'Stu Fellowship', zipcode: '89675',status:'Inactive'});
        }
    });
}

exports.createDefaultJoinedFellows=createDefaultJoinedFellows;
