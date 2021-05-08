const bcrypt = require("bcryptjs");
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

var FavSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	loc: { type: String, required: true }, 
  });

var User = mongoose.model('User', UserSchema);
var Comment = mongoose.model('Comment', CommentSchema);
var Favplace = mongoose.model('Favplace', FavSchema);

var PlaceSchema = mongoose.Schema({
	placeId: { type: String, required: true, unique: true },
	placeName: { type: String, required: true, unique: true },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true }
});

var Place = mongoose.model('Place', PlaceSchema);

// POST //
app.post('/login', async function (req, res) { // LOGIN SYSTEM
	var username = req.body.id;
	var password = req.body.pw;
	User.findOne({ username: username }, async function (err, user) {
		if (user.admin === true) {
			return res.status(201).json({ msg: 'admin' }); // ADMIN
		}
		else if (user) {
			const validPassword = await bcrypt.compare(password, user.password);
			if (validPassword) { // correct pw
				return res.status(200).json({ msg: 'success' });
			}
			else { // wrong pw
				return res.status(400).json({ error: "invalid password"});
			}
		}
		else {
			return res.status(422).json({ msg: 'user does not exist' }); // NO USER EXISTS.
		}
	});
})


app.get('/fav/:user', function(req,res) {  
	//var user = req.body.id; 
    Favplace.findOne({username: req.params['user']})                                 
    .then(p => {       
        if(!p) {       
         return  res.send("No Favourite Place is not found");      
        }
        return res.send(p.loc);
      }).catch((e) => {      
        return res.send("Error \n"+ e );    
      });
    });

app.post('/favadd', function(req,res) {
		var username = req.body.username;
		var loc = req.body.loc;
        var e = new Favplace({
        username: username, 
        loc: loc
        });
        e.save(function(err) {
			if (err)
			return res.status(422).json({ msg: 'fail' });			
			else return res.status(200).json({ msg: 'success' });
        
        });
    });


// CRUD userData
app.post('/userData/createUser/create', async function (req, res) {
	User.findOne(
		{ username: req.body.id },
		async function (err, e) {
			//if (err) return res.send(err);
			if (e === null || e === " ") {
				const createUser = req.body.id;
				const createPassword = req.body.pw;
				if (createUser.length >= 4 && createUser.length <= 20) {
					if (createPassword.length >= 4 && createPassword.length <= 20) {
						const salt = await bcrypt.genSalt(10); // generate salt
						var x = new User({
							username: createUser,
							password: createPassword,
							admin: false,
						});
						x.password = await bcrypt.hash(x.password, salt);
						x.save( function(err) {
							if (err) return res.send(err);
							return res.status(201).send(
									"New user account created! <br>Username: " +
									createUser +
									"<br>\n" +
									"Password: " +
									createPassword
								);
						})
					}
					else return res.send("User Password must be 4-20 characters long.");
				}
				else return res.send("Username must be 4-20 characters long.");
			}
			else
				return res.send("Username is registered already. Please choose another username.");
		}
	)
})

app.post('/userData/retrieveUser/retrieve', function (req, res) {
	User.findOne(
		{ username: req.body.id },
		"username password",
		(err, e) => {
			if (err) return res.send(err);
			if (e === null || e === " ") 
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

app.post('/userData/updateUser/update', async function (req, res) {
	
	User.findOne(
		{ username: req.body.id },
		"username password",
		async (err, e) => {
			if (err) return res.send(err);
			if (e === null || e === " ")
				return res.send("User account not found");
			else { 
				User.findOne( // check if newid is taken
				{username: req.body.newid},
				"username",
				async (err,e2) => {
					if (err) return res.send(err);
					if (e2 !== null && e2 !== " ") {
						return res.send("New Username was taken");
					}
					else {
						const createNewUser = req.body.newid;
						const createNewPassword = req.body.newpw;
						if (createNewUser.length >= 4 && createNewUser.length <= 20) {
							if (createNewPassword >= 4 && createNewPassword.length <= 20) {
								if (e.username !== req.body.newid) {
									e.username = req.body.newid;
								}
								const salt = await bcrypt.genSalt(10);
								e.password = createNewPassword;
								e.password = await bcrypt.hash(e.password, salt);
								e.save();
								return res.status(201).send(
									"User account updated! <br>Username: " +
									req.body.id +
									"<br>\n" +
									"New Username: " +
									e.username +
									"<br>\n" +
									"New Password: " +
									createNewPassword
								);
							}
							else return res.send("User Password must be 4-20 characters long.")
						}
						else return res.send("Username must be 4-20 characters long.");
					}
				});
			}
		}
	)
})

app.post('/userData/deleteUser/delete', function (req, res) {
	User.findOne(
		{ username: req.body.id },
		"username password",
		(err, e) => {
			if (err) return res.send(err);
			if (e === null || e === " ") 
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
	Place.findOne(
		{ placeId: req.body.id }, // need to check name?
		(err, e) => {
			//if (err) return res.send(err);
			if (e === null || e === " ") {
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
	Place.findOne(
		{ placeId: req.body.id },
		"placeId placeName latitude longitude",
		(err, e) => {
			if (err) return res.send(err);
			if (e === null || e === " ") 
				return res.send("Place data not found");
			else {
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
	Place.findOne(
		{ placeId: req.body.id },
		"placeId placeName latitude longitude",
		(err, e) => {
			if (err) return res.send(err);
			if (e === null || e === " ") 
				return res.send("Place data not found");
			else{	
				if (e.placeId !== req.body.newid ){
						e.placeId = req.body.newid;
				}
				if (e.placeName !== req.body.newname){
					e.placeNmae = req.body.newname;
				}
				if (e.latitude !== req.body.newlat){
					e.latitude = req.body.newlat;
				}
				if (e.longitude !== req.body.newlog){
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
	Place.findOne(
		{ placeId: req.body.id },
		"placeId placeName latitude longitude",
		(err, e) => {
			if (err) return res.send(err);
			if (e === null || e === " ") 
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
	var locID = req.body.location;
	Comment.find({ locID }, function (err, data) {
		if (err) {
			return console.log('err');
		}
		if (!data) {
			return res.status(422).json({ msg: 'comment not exist' });
		}
		else {
			return res.status(200).json({ data, msg: 'comment fetched' }); // SUCCESS
		}
	});
})

app.post('/createComment', function (req, res) {
	var locID = req.body.locID;
	var username = req.body.username;
	var comment = req.body.comment;

	Comment.create({ locID, username, comment }, (err, data) => {
		if (err) {
			console.log(Date.now());
			return res.status(422).json({ msg: 'error' });
		} else {
			return res.status(200).json({ data, msg: 'comment created' });
		}
	})
})


const server = app.listen(2096);
