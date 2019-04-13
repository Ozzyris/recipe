const express = require('express'),
	  router = express.Router(),
	  bodyParser = require('body-parser'),
	  recipe_model = require('../models/recipe').recipe;

// MIDDLEWARE
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

	router.get('/ping', function (req, res) {
		res.status(200).json({message: 'pong'});
	});

	router.get('/get-all-recipes', function (req, res) {
		recipe_model.get_all_recipes()
			.then( all_recipes => {
				res.status(200).json(all_recipes);
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/get-recipe', function (req, res) {
		let recipe_url = req.body.recipe_url;
		recipe_model.get_recipes( recipe_url )
			.then( recipe => {
				res.status(200).json(recipe);
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

module.exports = {
	"public" : router
};