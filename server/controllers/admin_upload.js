const express = require('express'),
	  router = express.Router(),
	  moment = require('moment'),
	  bodyParser = require('body-parser'),
	  recipe_model = require('../models/recipe').recipe;

// HELPERS
const upload_manager = require('../helpers/upload_manager'),
	  single_image_upload = upload_manager.single('illustration_file'),
	  s3_file_manager = require('../helpers/s3_file_manager');

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
				},
				is_previous_image;
	
			recipe_model.get_illustration_from_id( recipe_id )
				.then( illustation_feedback => {
					if( illustation_feedback.illustration == undefined ){
						is_previous_image = false;
					}else{
						let illustration_url = illustation_feedback.illustration,
							illustration_key = illustration_url.split("/");
						is_previous_image = illustration_key[(illustration_key.length)-1];
					}
					return recipe_model.update_illustration( recipe_id, payload );
				})
				.then( is_illustation_updated => {
					if( is_previous_image != false ){
						return s3_file_manager.delete_file_from_s3( is_previous_image );
					}else{
						res.status(200).json({message: 'Illustration updated', code: 'illustration_updated', edit_date: payload.edit_date, new_illustration: payload.illustration});
					}
				})
				.then( is_old_illustation_deleted => {
					res.status(200).json({message: 'Illustration updated', code: 'illustration_updated', edit_date: payload.edit_date, new_illustration: payload.illustration});

				})
				.catch( error => {
					res.status(401).json( error );
				})
		})
	});

module.exports = {
	"admin_upload" : router
};