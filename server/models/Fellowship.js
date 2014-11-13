/*************************************************************************************
 4.29.2014 added to include fellowship collection
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var fellowSchema = mongoose.Schema({
	name: {type: String, required: '(name) is required!', index: true},
	zipcode: {type: String, required: '(zipcode) is required!', index: true},
	about: {type: String},
	status: {type: String, index: true},
	//admin:[{type:ObjectId, ref: 'User', unique: false, required:'(MEMBER) is required!'}],
	//createDate:{type:Date, required:'(CREATEDATE) is required!','default': Date.now, unique:false},
	url: {type: String},
	//address:{type:String,required:'(address) is required!'},
	//description:{type:String,required:'(description) is required!'},
	reason: {type: String}
});

var Fellow = mongoose.model('Fellow', fellowSchema);

function createDefaultFellows() {
	Fellow.find({}).exec(function (err, collection) {
		console.log("asdfasdfasdfsadf");
		console.log(collection.length);
		if (collection.length === 0) {

			Fellow.create({name: '提摩太團契', zipcode: '12456', about: 'Wix is the leading web publishing platform with over 37 million users worldwide. Wix makes it easier than ever to create a stunning website for free by giving you all the essentials. Choose from 100s of designer-made HTML5 templates. Use the '});
			Fellow.create({name: 'Agape Fellowship', zipcode: '78912', about: 'Enhance your website by adding popular web Apps & Services like Facebook Comments, Instagram, Google Maps & SoundCloud.'});
			Fellow.create({name: 'Young Adult Fellowship', zipcode: '34567', about: 'instantly with one-click to publish. You even have the option to enable people to find you on search engines like Google, Yahoo, Bing & more.'});
			Fellow.create({name: 'Abc Fellowship', zipcode: '65432', about: 'No spectators were injured in the crash, said Peter Gaynor, the director of the Providence Emergency Management Agency. The performers suffered serious injuries, but they appeared to be non-life-threatening, he said.'});
			Fellow.create({name: 'Def Fellowship', zipcode: '87564', about: 'So whether you’re a designer, programmer, musician, artist or small business owner, Wix has something for everyone.'});
			Fellow.create({name: 'Ghi Fellowship', zipcode: '23574', about: 'The show was suspended after the crash, the company said. Two performances scheduled for 3 p.m. and 7 p.m. were canceled.'});
			Fellow.create({name: 'Jkl Fellowship', zipcode: '57575', about: 'The Occupational Safety and Health Administration is leading the investigation into the crash, with help from local officials, Mr. Gaynor said.'});
			Fellow.create({name: 'Mno Fellowship', zipcode: '57575', about: 'There were almost 4,000 people at the performance, many of them children, Mr. Gaynor said. Officials planned to make resources available to those who witnessed the harrowing crash.'});
			Fellow.create({name: 'Pqr Fellowship', zipcode: '33433', about: 'Emma Sulkowicz said she knew it would be awful to go before a disciplinary panel and describe being raped by a fellow student, but nothing prepared her for what came next. She said one of the two women on the panel, a university official, asked her, repeatedly, how the painful sex act she described was physically possible.'});
			Fellow.create({name: 'Stu Fellowship', zipcode: '89675', about: 'Columbia University, said she felt her body freeze up and her heart race as she tried to answer questions that seemed to her to reveal not just skepticism about her story, but also disturbing ignorance in someone who had supposedly been trained for this role.'});
		}
	});
}

exports.createDefaultFellows = createDefaultFellows;
