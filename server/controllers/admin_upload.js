const express = require('express'),
	  router = express.Router(),
	  moment = require('moment'),
	  bodyParser = require('body-parser'),
	  recipe_model = require('../models/recipe').recipe;

const upload_manager = require('../helpers/upload_manager');
const single_image_upload = upload_manager.single('illustration_file');

// MIDDLEWARE
router.use( require('../middlewares/index').check_auth );
router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
router.use(bodyParser.json({limit: '50mb'}));

	router.get('/ping', function (req, res) {
		res.status(200).json({message: 'pong'});
	});

	router.post('/recipe-illustration/:recipe_id', function (req, res) {
		single_image_upload(req, res, function(err){
				let recipe_id = req.params.recipe_id,
				payload = {
					illustration: req.file.location,
					edit_date: moment()
				};
				console.log(payload.illustration);
			
			// check if element already exist
			recipe_model.update_illustration( recipe_id, payload )
				.then( is_illustation_updated => {
					console.log(is_illustation_updated);
					res.status(200).json({message: 'Illustration updated', code: 'illustration_updated', edit_date: payload.edit_date, new_illustration: payload.illustration});
				})
				.catch( error => {
					res.status(401).json( error );
				})
			// if upload success delete old illustration
		})
	});

module.exports = {
	"admin_upload" : router
};