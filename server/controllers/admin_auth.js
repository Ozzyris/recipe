const express = require('express'),
	  router = express.Router(),
	  bodyParser = require('body-parser');

// HELPERS
const bcrypt = require('../helpers/bcrypt'),
	  token_manager = require('../helpers/token_manager');

// MIDDLEWARE
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

	router.get('/ping-server', function (req, res) {
		res.status(200).json({message: 'pong'});
	});

module.exports = {
	"admin_auth" : router
};