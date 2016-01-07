var express		= require('express');
var app				= express();
var bodyParser = require('body-parser');

// confgure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extend: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES
var router = express.Router();

router.get('/', function (req, res) {
	res.json({ message: 'hello world'});
});


// additional routes added here


// REGISTER ROUTES
app.use('/api', router);

// START SERVER
app.listen(port);
console.log('go to port ' + port);