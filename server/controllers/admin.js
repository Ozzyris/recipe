const express = require('express'),
	  router = express.Router(),
	  bodyParser = require('body-parser'),
	  recipe_model = require('../models/recipe').recipe;

// MIDDLEWARE
router.use( require('../middlewares/index').check_auth );
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

	router.get('/ping', function (req, res) {
		res.status(200).json({message: 'pong'});
	});

	router.put('/create-recipe', function (req, res) {
		let recipe = {
			title: req.body.title,
			url: '',
		};
		recipe.url = recipe.title.toLowerCase().replace(/\n/g, "<br />").replace(/ +/g, "-")

		new recipe_model(recipe).save()
			.then( is_recipe_created => {
				res.status(200).json({message: 'New recipe added to the database', code: 'recipe_created'});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-title', function (req, res) {
		let id = req.body.id,
			payload = {
				title: req.body.title,
				url: '',
			};
		payload.url = payload.title.toLowerCase().replace(/\n/g, "<br />").replace(/ +/g, "-");

		recipe_model.update_title( id, payload )
			.then( is_title_updated => {
				res.status(200).json({message: 'Title updated', code: 'title_updated'});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-summary', function (req, res) {
		let id = req.body.id,
			summary= req.body.summary;

		recipe_model.update_summary( id, summary )
			.then( is_title_updated => {
				res.status(200).json({message: 'Summary updated', code: 'summary_updated'});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-tips', function (req, res) {
		let id = req.body.id,
			tips = req.body.tips;

		recipe_model.update_tips( id, tips )
			.then( is_tips_updated => {
				res.status(200).json({message: 'Tips updated', code: 'tips_updated'});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-time', function (req, res) {
		let id = req.body.id,
			time = req.body.time;

		recipe_model.update_time( id, time )
			.then( is_time_updated => {
				res.status(200).json({message: 'Time updated', code: 'time_updated'});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-yield', function (req, res) {
		let id = req.body.id,
			yield = req.body.yield;

		recipe_model.update_yield( id, yield )
			.then( is_yield_updated => {
				res.status(200).json({message: 'Yield updated', code: 'yield_updated'});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-tags', function (req, res) {
		let id = req.body.id,
			tags = req.body.tags;

		recipe_model.update_tags( id, tags )
			.then( is_yield_updated => {
				res.status(200).json({message: 'Tags updated', code: 'tags_updated'});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-ingredients', function (req, res) {
		let id = req.body.id,
			ingredient = {
				name: req.body.name,
				order: req.body.order
			}

		recipe_model.update_ingredients( id, ingredient )
			.then( is_ingredient_updated => {
				res.status(200).json({message: 'Ingredient updated', code: 'ingredient_updated'});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

module.exports = {
	"admin" : router
};