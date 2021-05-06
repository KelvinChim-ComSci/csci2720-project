const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://s1155126571:x73339@localhost/s1155126571');

var db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
	console.log("Connection is open...");
});

var UserSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }, // NEED HASHING
	admin: { type: Boolean }
});

var CommentSchema = mongoose.Schema({
	locID: { type: String, required: true },
	username: { type: String, required: true },
	comment: { type: String, required: true }, // NEED HASHING
	timestamp: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

var User = mongoose.model('User', UserSchema);
var Comment = mongoose.model('Comment', CommentSchema);

var PlaceSchema = mongoose.Schema({
	placeId: { type: String, required: true, unique: true },
	placeName: { type: String, required: true, unique: true },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true }
});

var Place = mongoose.model('Place', PlaceSchema);

/*app.get('/*', function(req,res) {
	User.findOne({}, function(err,user) {
		if (err) {
			return res.send(err);
		}
		return user;
	})
}) */

// POST //
app.post('/login', function (req, res) { // LOGIN SYSTEM
	console.log("Post request received!!");
	var username = req.body.id;
	var password = req.body.pw;
	console.log(req.body);
	User.findOne({ username: username, password: password }, function (err, user) {
		if (err) {
			return console.log('err'); // ERROR
		}

		if (!user) {
			return res.status(422).json({ msg: 'user not exist' }); // NO USER EXISTS. WRONG PW OR WRONG ID.
		}

		if (user.admin == true) {
			return res.status(201).json({ msg: 'admin' }); // ADMIN
		}
		else return res.status(200).json({ msg: 'success' }); // SUCCESSFUL
	})
})

// CRUD userData
app.post('/userData/createUser/create', function (req, res) {
	console.log("Create user request received!!");
	console.log(req.body);
	User.findOne(
		{ username: req.body.id },
		(err, e) => {
			//if (err) return res.send(err);
			if (e == null || e == " ") {
				var x = new User({
					username: req.body.id,
					password: req.body.pw,
					admin: false,
				});
				x.save(function (err) {
					if (err) return res.send(err);
					return res
						.status(201)
						.send(
							"New user account created! <br>Username: " +
							req.body.id +
							"<br>\n" +
							"Password: " +
							req.body.pw
						);
				})
			}
			else
				return res.send("Username registered already");
		}
	)
})

app.post('/userData/retrieveUser/retrieve', function (req, res) {
	console.log("Retrieve user request received!!");
	console.log(req.body);
	User.findOne(
		{ username: req.body.id },
		"username password",
		(err, e) => {
			if (err) return res.send(err);
			if (e == null || e == " ")
				return res.send("User account not found");
			else {
				return res.status(201).send(
					"User account retrieved! <br>Username: " +
					e.username +
					"<br>\n" +
					"Password: " +
					e.password
				);
			}
		}
	)
})

app.post('/userData/updateUser/update', function (req, res) {
	console.log("Update user request received!!");
	console.log(req.body);
	User.findOne(
		{ username: req.body.id },
		"username password",
		(err, e) => {
			if (err) return res.send(err);
			if (e == null || e == " ")
				return res.send("User account not found");
			else {
				if (e.username != req.body.id) {
					e.username = req.body.newid;
				}
				if (e.password != req.body.newpw) {
					e.password = req.body.newpw;
				}
				e.save();
				return res.status(201).send(
					"User account updated! <br>Username: " +
					req.body.id +
					"<br>\n" +
					"New Username: " +
					e.username +
					"<br>\n" +
					"New Password: " +
					e.password
				);
			}
		}
	)
})

app.post('/userData/deleteUser/delete', function (req, res) {
	console.log("Delete user request received!!");
	console.log(req.body);
	User.findOne(
		{ username: req.body.id },
		"username password",
		(err, e) => {
			if (err) return res.send(err);
			if (e == null || e == " ")
				return res.send("User account not found");
			else {
				User.deleteOne({ username: req.body.id }).exec(function (
					err,
					l
				) {
					if (err) return res.send(err);
					return res.status(201).send(
						"User account deleted! <br>Username: " +
						e.username +
						"<br>\n" +
						"Password: " +
						e.password
					);
				});
			}
		}
	)
})

app.post('/placeData/createPlace/create', function (req, res) {
	console.log("Create place request received!!");
	console.log(req.body);
	Place.findOne(
		{ placeId: req.body.id }, // need to check name?
		(err, e) => {
			//if (err) return res.send(err);
			if (e == null || e == " ") {
				var x = new Place({
					placeId: req.body.id,
					placeName: req.body.name,
					latitude: req.body.lat,
					longitude: req.body.log,
				});
				x.save(function (err) {
					if (err) return res.send(err);
					return res
						.status(201)
						.send(
							"New place created! <br>Place ID: " +
							req.body.id +
							"<br>\n" +
							"Place name: " +
							req.body.name +
							"<br>\n" +
							"Place latitude: " +
							req.body.lat +
							"<br>\n" +
							"Place longitude: " +
							req.body.log
						);
				})
			}
			else
				return res.send("Place ID registered already");
		}
	)
})

app.post('/placeData/retrievePlace/retrieve', function (req, res) {
	console.log("Retrieve place request received!!");
	console.log(req.body);
	Place.findOne(
		{ placeId: req.body.id },
		"placeId placeName latitude longitude",
		(err, e) => {
			if (err) return res.send(err);
			if (e == null || e == " ")
				return res.send("Place data not found");
			else {
				console.log(e)
				return res.status(201).send(
					"Place data retrieved! <br>Place ID: " +
					e.placeId +
					"<br>\n" +
					"Place name: " +
					e.placeName +
					"<br>\n" +
					"Place latitude: " +
					e.latitude +
					"<br>\n" +
					"Place longitude: " +
					e.longitude
				);
			}
		}
	)
})

app.post('/placeData/updatePlace/update', function (req, res) {
	console.log("Update place request received!!");
	console.log(req.body);
	Place.findOne(
		{ placeId: req.body.id },
		"placeId placeName latitude longitude",
		(err, e) => {
			if (err) return res.send(err);
			if (e == null || e == " ")
				return res.send("Place data not found");
			else {
				if (e.placeId != req.body.newid) {
					e.placeId = req.body.newid;
				}
				if (e.placeName != req.body.newname) {
					e.placeNmae = req.body.newname;
				}
				if (e.latitude != req.body.newlat) {
					e.latitude = req.body.newlat;
				}
				if (e.longitude != req.body.newlog) {
					e.longitude = req.body.newlog;
				}
				e.save();
				return res.status(201).send(
					"Place data updated! <br>Place ID: " +
					req.body.id +
					"<br>\n" +
					"New Place ID: " +
					e.placeId +
					"<br>\n" +
					"New Place name: " +
					e.placeName +
					"<br>\n" +
					"New Place latitude: " +
					e.latitude +
					"<br>\n" +
					"New Place longitude: " +
					e.longitude
				);
			}
		}
	)
})

app.post('/placeData/deletePlace/delete', function (req, res) {
	console.log("Delete place request received!!");
	console.log(req.body);
	Place.findOne(
		{ placeId: req.body.id },
		"placeId placeName latitude longitude",
		(err, e) => {
			if (err) return res.send(err);
			if (e == null || e == " ")
				return res.send("Place data not found");
			else {
				Place.deleteOne({ placeId: req.body.id }).exec(function (
					err,
					l
				) {
					if (err) return res.send(err);
					return res.status(201).send(
						"Place data deleted! <br>Place ID: " +
						e.placeId +
						"<br>\n" +
						"Place name: " +
						e.placeName +
						"<br>\n" +
						"Place latitude: " +
						e.latitude +
						"<br>\n" +
						"Place longitude: " +
						e.longitude
					);
				});
			}
		}
	)
})

app.post('/fetchComment', function (req, res) {
	console.log("fetch comment post request received!");
	var locID = req.body.location;
	Comment.find({ locID }, function (err, data) {
		if (err) {
			return console.log('err');
		}
		if (!data) {
			return res.status(422).json({ msg: 'comment not exist' });
		}
		else {
			console.log(data);
			return res.status(200).json({ data, msg: 'comment fetched' }); // SUCCESS
		}
	});
})

app.post('/createComment', function (req, res) {
	console.log("create comment post request received!");
	var locID = req.body.locID;
	var username = req.body.username;
	var comment = req.body.comment;
	console.log(locID + " " + username + " " + comment);

	Comment.create({ locID, username, comment }, (err, data) => {
		if (err) {
			console.log(Date.now());
			return res.status(422).json({ msg: 'error' });
		} else {
			return res.status(200).json({ data, msg: 'comment created' });
		}
	})
})

//  SYNTAX FORMAT  //
/* app.get('/loc', function(req,res) {
	var keyword = req.query['quota'];
	if (keyword === undefined) {
	Location.find({}, 'locId name quota',
		function(err_l,l) {
			if (err_l)
				res.send(err_l);
			var response = "";
			for ( i = 0; i < l.length; i++) {
				response = response + 
				"Location ID: " + l[i].locId + "<br>\n" +
				"Location name: " + l[i].name + "<br>\n" +
				"Location quota: " + l[i].quota + "<br><br>\n";
			};
			res.send(response);
		});
	}
	else {
		Location.find( { quota: {$gte:keyword}}, 'locId name quota',
			function(err, location) {
				if (err)
					res.send(err);
				if (location.length == 0)
					res.send("Quota is too large for any suitable locations.")
				else {
					var response = "";
					for ( i = 0; i < location.length ;i++) {
						response = response + 
							"Location ID: " + location[i].locId + "<br>\n" +
							"Location Name: " + location[i].name + "<br>\n" +
							"Location quota: " + location[i].quota + "<br><br>\n";
					}
					res.send(response);
				}
			}
		)
	}
});
*/

// listen to port 2096
const server = app.listen(2101);
