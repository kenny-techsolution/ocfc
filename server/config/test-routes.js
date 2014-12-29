/*******************************************************************************
 * Routes are required to connect to the server
 *
 * Mapping:
 *
 * GET -> $HTTP GET QUERY -> $HTTP GET UPDATE -> $HTTP PUT (REQ BODY permitted)
 * REMOVE -> $HTTP DELETE ADD -> $HTTP POST (REQ BODY permitted)
 ******************************************************************************/

var albums = require('../controllers/albums'),
	calendars = require('../controllers/calendars'),
	churches = require('../controllers/churches');
	events = require('../controllers/events'),
	fellowships = require('../controllers/fellowships'),
	files = require('../controllers/files'),
	folders = require('../controllers/folders'),
	images = require('../controllers/images'),
	inits = require('../controllers/inits'),
	inviteOtherToFellowship = require('../controllers/inviteOtherToFellowship'),
	posts = require('../controllers/posts'),
	stats = require('../controllers/stats'),
	users = require('../controllers/users'),

	/*--Others--*/
	auth = require('./auth'),
	eventsOld = require('../controllers/events-old'),
	cloudinary = require('cloudinary');

module.exports = function (app, io) {
	/* ------ Socket IO setup -------- */
	var ioSocket;
	io.on('connection', function (socket) {
		ioSocket = socket;
		ioSocket.emit('testSocket', {result: "Socket test complete"});
	});

	/* ------ Standard User related API -------- */
	app.post('/api/users', users.createUserTest);
//	app.put('/api/users', users.updateUserTest);
//	app.get('/api/users/:id', users.getUserByIdTest);
//	app.delete('/api/users', users.deleteUserTest);
//	app.get('/api/activate',users.activateUserTest);
//
//	/*one off API calls*/
//	app.get('/api/users/:id/reset_password', users.resetPasswordTest);
//	app.put('/api/eventParticipation/:event_id', users.updateEventParticipationTest);
//	app.get('/api/getActivation',users.getActivationTest);
//	app.put('/api/updatePassword',users.updateUserPasswordTest);
//	app.delete('/api/activate',users.deleteUserFromActivationTest);
//	app.put('/api/users/update_profile_image', users.updateProfileImageTest);
//
//	/* ------ Fellowship related API -------- */
	app.post('/api/fellowships', fellowships.createFellowshipTest);
//	app.put('/api/fellowships/:id', fellowships.updateFellowshipByIdTest);
//	app.get('/api/fellowships/:id', fellowships.getFellowshipById);
//	app.delete('/api/fellowships/:id', fellowships.deleteFellowshipByIdTest);
//	app.get('/api/fellowships', fellowships.queryFellowshipsTest);
//
//
	app.post('/api/fellowships/users', fellowships.addUserToFellowshipTest);
//	app.get('/api/fellowships/:fellowship_id/users', fellowships.getUsersFromFellowshipTest);
//	app.put('/api/fellowships/:fellowship_id/users/:user_id', fellowships.updateUserToFellowshipTest);
//	app.delete('/api/fellowships/:fellowship_id/users/:user_id', fellowships.removeUserFromFellowshipTest);
//
//	/* ------ Invite Other To Fellowships related API -------- */
//	app.post('/api/inviteOtherToFellowships/:fellowship_id', inviteOtherToFellowship.createInviteTest);
//	app.get('/api/inviteOtherToFellowships', inviteOtherToFellowship.queryInvitesTest);
//	app.get('/api/inviteOtherToFellowships/:id', inviteOtherToFellowship.getInviteTest);
//	app.delete('/api/inviteOtherToFellowships/:id', inviteOtherToFellowship.deleteInviteTest);
//
//	/* ------ Church related API -------- */
	app.post('/api/churches', churches.createChurchTest);
//	app.put('/api/churches/:id', churches.updateChurchByIdTest);
//	app.get('/api/churches/:id', churches.getChurchByIdTest);
//	app.get('/api/churches', churches.queryChurchesTest);
//	app.delete('/api/churches/:id', churches.deleteChurchByIdTest);
//
	app.post('/api/churches/fellowships', churches.addFellowshipToChurchTest);
//	app.put('/api/churches/:church_id/fellowships/:fellowship_id', churches.updateFellowshipToChurchTest);
//	app.get('/api/churches/:church_id/fellowships', churches.getFellowshipsTest);
//	app.delete('/api/churches/:church_id/fellowships/:fellowship_id', churches.removeFellowshipFromChurchTest);
//
//	app.post('/api/churches/:church_id/users/:user_id', churches.addUserToChurchTest);
//	app.put('/api/churches/:church_id/users/:user_id', churches.updateUserToChurchTest);
//	app.get('/api/churches/:church_id/users', churches.getUsersTest);
//	app.delete('/api/churches/:church_id/users/:user_id', churches.removeUserFromChurchTest);
//
//	/* ------ Post related API -------- */
//	app.post('/app/posts', posts.createPostTest);// put Socket IO emit.
//	app.get('/app/posts/:id', posts.getPostTest);
//	app.get('/app/posts', posts.queryPostTest);
//	app.put('/app/posts/:id', posts.updatePostTest);
//	app.delete('/app/posts/:id', posts.removePostTest);
//
//	app.post('/app/posts/:post_id/comments', posts.addCommentToPostTest);
//	app.put('/app/posts/:post_id/comments/:comment_id', posts.updateCommentFromPostTest);
//	app.delete('/app/posts/:post_id/comments/:comment_id', posts.deleteCommentFromPostTest);
//
//	/* ------ Calendar related API -------- */
//	app.post('/api/calendars', calendars.createCalendarTest);
//	app.get('/api/calendars/:id', calendars.getCalendarTest);
//	app.get('/api/calendars', calendars.queryCalendarsTest);
//	app.put('/api/calendars/:id', calendars.updateCalendarTest);
//	app.delete('/api/calendars/:id', calendars.deleteCalendarTest);
//
//	app.post('/api/calendars/:calendar_id/events', calendars.createEventToCalendarTest);
//	app.get('/api/calendars/:calendar_id/events', calendars.queryEventsFromCalendarTest);
//	app.get('/api/events/:event_id', events.getEventTest);
//	app.put('/api/events/:event_id', events.updateEventTest);
//	app.delete('/api/events/:event_id', events.deleteEventTest);
//
//	app.post('/api/events/:event_id/comments', events.addCommentToEventTest);
//	app.put('/api/events/:event_id/comments/:comment_id', events.updateCommentFromEventTest);
//	app.delete('/api/events/:event_id/comments/:comment_id', events.deleteCommentFromEventTest);
//	//add invitee crud functions.
//
//
//	/* ------ Album related API -------- */
//	app.post('/api/albums', albums.createAlbumTest);
//	app.get('/api/albums/:id', albums.getAlbumTest);
//	app.put('/api/albums/:id', albums.updateAlbumTest);
//	app.delete('/api/albums/:id', albums.deleteAlbumTest);
//
//	app.post('/api/albums/:album_id/images', albums.createImageTest);
//	app.get('/api/albums/:album_id/images', albums.queryImagesTest);
//	app.get('/api/images/:image_id', images.getImageTest);
//	app.put('/api/images/:image_id', images.updateImageTest);
//	app.delete('/api/images/:image_id', images.deleteImageTest);
//
//	app.post('/api/images/:image_id/comments', images.addCommentToImageTest);
//	app.put('/api/images/:image_id/comments/:comment_id', images.updateCommentFromImageTest);
//	app.delete('/api/images/:image_id/comments/:comment_id', images.deleteCommentFromImageTest);
//
//	/* ------ Folder related API -------- */
//	app.post('/api/folders', folders.createFolderTest);
//	app.get('/api/folders/:id', folders.getFolderTest);
//	app.get('/api/folders', folders.queryFoldersTest);
//	app.put('/api/folders/:id', folders.updateFolderTest);
//	app.delete('/api/folders/:id', folders.deleteFolderTest);
//
//	app.post('/api/folders/:folder_id/files', folders.createFileTest);
//	app.get('/api/folders/:folder_id', folders.queryFilesTest);
//	app.get('/api/files/:file_id', files.getFileTest);
//	app.put('/api/files/:file_id', files.updateFileTest);
//	app.delete('/api/files/:file_id', files.deleteFileTest);
//
//	app.post('/api/files/:file_id/comments', files.addCommentToFileTest);
//	app.put('/api/files/:file_id/comments/:comment_id', files.updateCommentFromFileTest);
//	app.delete('/api/files/:file_id/comments/:comment_id', files.deleteCommentFromFileTest);

	/*------Init, Stat----- */
	app.get('/api/inits',inits.getInit);
	/* ------ Traffic data API -------- */
	app.get('/api/stats',stats.getStats);

	/*------Cloudinary Image Signing------ */
	app.get('/cloudinarySigned', function(req, res){
		if (req.query.type==="avatar"){
			configurationObj={
			timestamp: cloudinary.utils.timestamp(),
			transformation: "c_limit,h_168,w_168",
			format: "jpg",
			public_id:req.user._id+'avatar'
			};
		}
		var params = cloudinary.utils.sign_request(configurationObj,
			{
				api_key: "399137143626587",
				api_secret: "royt6Nw2fVrbRtdwT_mjmDP7CkE"
			});
		res.json(params);
	});

	// -----------------------------------------------------------------------------
/*
 * LEGACY CODE //4.29.2014, retrieve data from fellows controller
 * app.get('/api/fellows',fellows.getFellows);
 * app.get('/api/fellows/:id',fellows.getFellow); //5.14.2015, create new
 * fellowship by Admin app.post('/api/fellows',fellows.createFellow);
 * app.put('/api/fellows/:id',fellows.updateFellow);
 *
 * //4.30.2014 equalvilant to add, create route for handling user joining
 * fellowship app.post('/api/fellowUsers',fellowUsers.createFellowUser);
 *
 * app.get('/api/fellowUsers',fellowUsers.queryFellowUser);
 * app.get('/api/fellowUsers/:id',fellowUsers.getFellowUser);
 * app.delete('/api/fellowUsers/:id',fellowUsers.removeFellowUser);
 *
 * //equalvilant to update
 * app.put('/api/fellowUsers/:id',fellowUsers.updateFellowUser);
 *
 * //5.24.2014 create post api app.post('/api/posts',posts.createPost,
 * function(req, res, next){ io.sockets.emit('routesSocket',res.$_emitBody);
 * res.send(res.$_emitBody); }); app.get('/api/posts',posts.queryPost);
 *
 * app.get('/api/init',init.getInit);
 */
	// Define a new route for Jade
	app.get('/partials/*', function(req, res){
		res.render('../../public/app/'+req.params);
	});

	// middleware will authenticate user
	app.post('/signup',users.signup);

	app.post('/login',auth.authenticate);

	app.post('/logout',function(req,res){
		req.logout();
		res.end();
	});

	app.all('/api/',function(req,res){
		res.send(404);
	});

	app.get('*',function(req,res){
		res.render('index',{
			bootstrappedUser: req.user
		});
	});
};
