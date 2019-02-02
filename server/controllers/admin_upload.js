const express = require('express'),
	  router = express.Router(),
	  bodyParser = require('body-parser');

// MIDDLEWARE
router.use( require('../middlewares/index').check_auth );
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

	router.get('/ping-server', function (req, res) {
		res.status(200).json({message: 'pong'});
	});

module.exports = {
	"admin_upload" : router
};