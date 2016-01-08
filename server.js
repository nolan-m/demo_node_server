var express			= require('express');
var app					= express();
var bodyParser 	= require('body-parser');
var mongoose 		= require('mongoose');
var Comment 		= require('./app/models/comment');

mongoose.connect('mongodb://localhost:27017/nodetest');

// confgure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extend: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES
var router = express.Router();

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

router.get('/', function (req, res) {
	res.json({ message: 'hello world'});
});

// additional routes added here


router.route('/comments')
			.post(function(req, res) {

				var comment = new Comment();  // create new instance of Comment model
				comment.name = req.body.name;  // set the comment name

				// save the comment
				comment.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json({ message: 'Comment created!'});
				})
			})

			.get(function(req, res) {
				Comment.find(function(err, comments) {
					if (err) {
						res.send(err);
					}
					res.json(comments);
				});
			});


router.route('/comments/:comment_id')
		.get(function(req,res) {
			Comment.findById(req.params.comment_id, function(err, comment) {
				if (err)
					res.send(err);

				res.json(comment);
			});
		});

// REGISTER ROUTES
app.use('/api', router);

// START SERVER
app.listen(port);
console.log('go to port ' + port);
