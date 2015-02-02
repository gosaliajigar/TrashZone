var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Creating node app for saving Todos ... ' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {

	var db = req.db;

	var collection = db.get('usercollection');

	collection.find({}, {}, function(e, docs) {
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
	res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service. */
router.post('/adduser', function(req, res) {

	// Set our internal DB variable.
	var db = req.db;

	// Get values form values.
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	// Set our collection.
	var collection = db.get('usercollection');

	// Insert into collection
	collection.insert({
		"username" : userName,
		"useremail" : userEmail
	}, function(err, doc) {
		if (err) {
			res.send("There was a problem in adding user to the database : " + err.message);
		} else {
			// If it worked, set the header so the address bar
			// doesn't still say /adduser
			res.location("userlist");
			// And forward to sucess page
			res.redirect("userlist");
		}
	});
});

/* GET Delete User page. */
router.get('/deleteuser', function(req, res) {
	res.render('deleteuser', { title: 'Delete Existing User' });
});

/* POST to Remove User Service. */
router.post('/removeuser', function(req, res) {

	var db = req.db;

	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('usercollection');

	var query = '';

	collection.remove({
		$and: [{ "username": userName }, { "useremail": userEmail }]}, function(err, doc) {
			if (err) {
				res.send("There was a problem in removing user from the database : " + err.message);
			} else {
				res.location("userlist");
				res.redirect("userlist");
			}
		});
});

module.exports = router;
