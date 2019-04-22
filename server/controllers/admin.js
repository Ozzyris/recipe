const express = require('express'),
	  router = express.Router(),
	  bodyParser = require('body-parser'),
	  moment = require('moment'),
	  recipe_model = require('../models/recipe').recipe;

// MIDDLEWARE
router.use( require('../middlewares/index').check_auth );
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

	router.get('/ping', function (req, res) {
		res.status(200).json({message: 'pong'});
	});

	router.put('/create-recipe', function (req, res) {
		let payload = {
			title: req.body.title,
			creation_date: moment(),
			edit_date: moment()
		};
		new recipe_model(payload).save()
			.then( is_recipe_created => {
				console.log(is_recipe_created)
				res.status(200).json({message: 'New recipe added to the database', code: 'recipe_created', recipe_id: is_recipe_created._id, edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-title', function (req, res) {
		let recipe_id = req.body.recipe_id,
			payload = {
				title: req.body.title,
				edit_date: moment()
			};
		recipe_model.update_title( recipe_id, payload )
			.then( is_title_updated => {
				res.status(200).json({message: 'Title updated', code: 'title_updated', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-url', function (req, res) {
		let recipe_id = req.body.recipe_id,
			payload = {
				url: req.body.url,
				edit_date: moment()
			};
			console.log(req.body);

		recipe_model.update_url( recipe_id, payload )
			.then( is_title_updated => {
				res.status(200).json({message: 'Url updated', code: 'url_updated', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-summary', function (req, res) {
		let recipe_id = req.body.recipe_id,
			payload = {
				summary: req.body.summary,
				edit_date: moment()
			};

		recipe_model.update_summary( recipe_id, payload )
			.then( is_title_updated => {
				res.status(200).json({message: 'Summary updated', code: 'summary_updated', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-tips', function (req, res) {
		let recipe_id = req.body.recipe_id,
			payload = {
				tips: req.body.tips,
				edit_date: moment()
			};

		recipe_model.update_tips( recipe_id, payload )
			.then( is_tips_updated => {
				res.status(200).json({message: 'Tips updated', code: 'tips_updated', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-time', function (req, res) {
		let recipe_id = req.body.recipe_id,
			payload = {
				time: req.body.time,
				edit_date: moment()
			};

		recipe_model.update_time( recipe_id, payload )
			.then( is_time_updated => {
				res.status(200).json({message: 'Time updated', code: 'time_updated', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-yield', function (req, res) {
		let recipe_id = req.body.recipe_id,
			payload = {
				yield: req.body.yield,
				edit_date: moment()
			};

		recipe_model.update_yield( recipe_id, payload )
			.then( is_yield_updated => {
				console.log(is_yield_updated);
				res.status(200).json({message: 'Yield updated', code: 'yield_updated', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/add-tag', function (req, res) {
		let recipe_id = req.body.recipe_id,
			payload = {
				tag: req.body.tag,
				edit_date: moment()
			};

		recipe_model.add_tag( recipe_id, payload )
			.then( is_tag_updated => {
				res.status(200).json({message: 'Tag added', code: 'tag_added', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});
	
	router.post('/delete-tag', function (req, res) {
		let recipe_id = req.body.recipe_id,
			payload = {
				tag: req.body.tag,
				edit_date: moment()
			};
		recipe_model.delete_tag( recipe_id, payload )
			.then( is_tag_deleted => {
				res.status(200).json({message: 'Tag deleted', code: 'tag_deleted', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/add-ingredient', function (req, res) {
		let recipe_id = req.body.recipe_id,
			payload = {
				name: req.body.name,
				order: req.body.order
			},
			edit_date = moment();

		recipe_model.count_ingredients( recipe_id )
			.then( ingredient_count => {
				if( payload.order == ingredient_count){
					return recipe_model.add_ingredient( recipe_id, payload );
				}else{
					throw { message: 'Your ingredient position isn\'t correct', code: 'wrong_ingredient_position'};
				}
			})
			.then( is_ingredient_updated => {
				console.log( is_ingredient_updated );
				res.status(200).json({message: 'Ingredient added', code: 'ingredient_added', id: '', name: payload.name, order: payload.order, edit_date: payload.edit_date});
			})
			.catch( error => {
				console.log(error);
				res.status(401).json( error );
			})
	});

	router.post('/update-ingredient', function (req, res) {
		let recipe_id = req.body.recipe_id,
			payload = {
				ingredient_id: req.body.ingredient_id,
				name: req.body.name,
				order: req.body.order,
				edit_date: moment()
			}
			console.log(payload, recipe_id);

		recipe_model.update_ingredient( recipe_id, payload )
			.then( is_ingredient_updated => {
				res.status(200).json({message: 'Ingredient updated', code: 'ingredient_updated', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/remove-ingredients', function (req, res) {
		let recipe_id = req.body.recipe_id,
			ingredient = {
				id: req.body.ingredient_id
			}

			recipe_model.remove_ingredients( recipe_id, ingredient )
			.then( is_ingredient_deleted => {
				res.status(200).json({message: 'Ingredient removed', code: 'ingredient_removed'});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

module.exports = {
	"admin" : router
};