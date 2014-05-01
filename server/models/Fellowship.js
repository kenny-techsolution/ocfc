/*************************************************************************************
 4.29.2014 added to include fellowship collection
 ***************************************************************************************/

var mongoose=require('mongoose');

var fellowSchema = mongoose.Schema({
    name: {type:String, required:'(PATH) is required!'},
    zipcode: {type:String,required:'(PATH) is required!'}});

var Fellow=mongoose.model('Fellow', fellowSchema);

function createDefaultFellows(){
    Fellow.find({}).exec(function(err,collection){
        if(collection.length===0){
            Fellow.create({name: 'Timothy Fellowship', zipcode: '12456'});
            Fellow.create({name: 'Agape Fellowship', zipcode: '78912'});
            Fellow.create({name: 'Young Adult Fellowship', zipcode: '34567'});
            Fellow.create({name: 'Abc Fellowship', zipcode: '65432'});
            Fellow.create({name: 'Def Fellowship', zipcode: '87564'});
            Fellow.create({name: 'Ghi Fellowship', zipcode: '23574'});
            Fellow.create({name: 'Jkl Fellowship', zipcode: '57575'});
            Fellow.create({name: 'Mno Fellowship', zipcode: '57575'});
            Fellow.create({name: 'Pqr Fellowship', zipcode: '33433'});
            Fellow.create({name: 'Stu Fellowship', zipcode: '89675'});
        }
    });
}

exports.createDefaultFellows=createDefaultFellows;
