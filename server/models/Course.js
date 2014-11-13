/*************************************************************************************
 This file creates a new mongoose model called courses that contains title, featured,
 published and tags fields.

 the function for the stored collection is called createDefaultCourses

 ***************************************************************************************/


var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
	title: {type: String, required: '(PATH) is required!'},
	featured: {type: Boolean, required: '(PATH) is required!'},
	published: {type: Date, required: '(PATH) is required!'},
	tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
	Course.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			Course.create({title: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013'), tags: ['C#']});
			Course.create({title: 'C# for Non-Sociopaths', featured: true, published: new Date('10/12/2013'), tags: ['C#']});
			Course.create({title: 'Super Duper Expert C#', featured: false, published: new Date('10/1/2013'), tags: ['C#']});
			Course.create({title: 'Visual Basic for Visual Basic Developers', featured: false, published: new Date('7/2/2013'), tags: ['VB']});
			Course.create({title: 'Pedantic C++', featured: true, published: new Date('1/1/2013'), tags: ['C++']});
			Course.create({title: 'Javascript for People over 20', featured: true, published: new Date('10/13/2013'), tags: ['JS']});
			Course.create({title: 'Maintainable Code for Cowards', featured: true, published: new Date('3/1/2013'), tags: ['Coding']});
			Course.create({title: 'A survival Guide to Code Reviews', featured: false, published: new Date('2/1/2013'), tags: ['Misc']});
			Course.create({title: 'How to Job Hunt Without Alerting your Boss', featured: true, published: new Date('10/7/2013'), tags: ['Management']});
			Course.create({title: 'How to Keep your Soul and go into Management', featured: false, published: new Date('8/1/2013'), tags: ['Misc']});
		}
	});
}

exports.createDefaultCourses = createDefaultCourses;

