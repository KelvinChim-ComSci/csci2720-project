const express = require('express');
const app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://s1155126571:x73339@localhost/s1155126571');

var db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console,'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
	console.log("Connection is open...");
});

var EventSchema = mongoose.Schema({
	eventId: { type: Number, required: true, unique: true },
	name: { type: String, required: true }, //Input
	loc: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
	quota: { type: Number } //Input
});


var Event = mongoose.model('Event', EventSchema);


// POST //

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}
));


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
const server = app.listen(2096);
