// require express
var express = require('express');
var app = express();
// require mongoose
var mongoose = require('mongoose');
var dbUri = "mongodb://s1155127464:x02795@localhost/s1155127464"
mongoose.connect(dbUri);
var db = mongoose.connection;

// require body-parser
const bodyParser = require('body-parser');

// require cors
const cors = require('cors');

// app.use
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({ origin: '*' }));

// Upon connection failure
db.on('error', console.error.bind(console, 'connection error:'));
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

// POST //

app.post('/login', function(req, res) { // LOGIN SYSTEM
	var username = req.body.id;
	var password = req.body['pw'];
	console.log("req.body");
	console.log(req.body);
	console.log("username: " + username);
	console.log("password: " + password);
	res.send("Hello World!");
	/*
	User.findOne({username: username, password: password}, function(err,user){
		if (err) {
			return console.log('err'); // ERROR
		}

		if (!user) {
			return res.status(404).send('wrong'); // NO USER EXISTS. WRONG PW OR WRONG ID.
		}

		if (user.admin == true) {
			return res.status(201).send('admin'); // ADMIN
		}
		else return res.status(200).send('okay'); // SUCCESSFUL
	})
	*/
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

app.all('/*', function(req, res) {
	res.send("Hello World");
})

// listen to port 2114
const server = app.listen(2114);
