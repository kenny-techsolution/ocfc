/*************************************************************************************
 4.29.2014 added to include joined fellowship collection
 ***************************************************************************************/

var mongoose=require('mongoose');
console.log("check objectId");
console.log(mongoose.Schema.ObjectId);
//!!!!!4.30.2014, we should grab the name and zipcode from fellows collection
var fellowMemSchema = mongoose.Schema({
    member:{type:mongoose.Schema.ObjectId, ref: 'User', unique:true, required:'(PATH) is required!'},
    fellowship:{type:mongoose.Schema.ObjectId, ref: 'Fellow', unique:true, required:'(PATH) is required!'},
    status:{type:String,required:'(PATH) is required!',unique:true},
    signupDate:{type:Date, required:'(PATH) is required!',unique:trueb }
});

var FellowMem =mongoose.model('FellowMem', fellowMemSchema);

//function createDefaultJoinedFellows(){
//    fellowMem.find({}).exec(function(err,collection){
//        if(collection.length===0){
//            fellowMem.create({name: 'Timothy Fellowship', zipcode: '12456',status:'Pending'});
//            fellowMem.create({name: 'Agape Fellowship', zipcode: '78912',status:'Pending'});
//            fellowMem.create({name: 'Young Adult Fellowship', zipcode: '34567',status:'Approved'});
//            fellowMem.create({name: 'Abc Fellowship', zipcode: '65432',status:'Approved'});
//            fellowMem.create({name: 'Def Fellowship', zipcode: '87564',status:'Approved'});
//            fellowMem.create({name: 'Ghi Fellowship', zipcode: '23574',status:'Approved'});
//            fellowMem.create({name: 'Jkl Fellowship', zipcode: '57575',status:'Inactive'});
//            fellowMem.create({name: 'Mno Fellowship', zipcode: '57575',status:'Inactive'});
//            fellowMem.create({name: 'Pqr Fellowship', zipcode: '33433',status:'Inactive'});
//            fellowMem.create({name: 'Stu Fellowship', zipcode: '89675',status:'Inactive'});
//        }
//    });
//}
//
//exports.createDefaultJoinedFellows=createDefaultJoinedFellows;
