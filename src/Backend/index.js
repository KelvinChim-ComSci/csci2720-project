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


var User = mongoose.model('User', UserSchema);

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

app.post('/userData/createUser/create', function(req,res){ 
	console.log("Post request received!!");
	var username = req.body.id;
	var password = req.body.pw;
	console.log(req.body);
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
