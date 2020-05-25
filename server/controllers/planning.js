const express = require('express'),
	  router = express.Router(),
	  bodyParser = require('body-parser'),
	  moment = require('moment'),
	  planning_model = require('../models/planning').planning;

// MIDDLEWARE
router.use( require('../middlewares/index').check_auth );
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

	router.get('/ping', function (req, res) {
		res.status(200).json({message: 'pong'});
	});

	router.post('/get-task', function (req, res) {
		planning_model.get_task( req.body.task_url )
			.then( task => {
				res.status(200).json(task);
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/get-weekly-tasks', function (req, res) {

		console.log(req.body.first_date, req.body.last_date);

		planning_model.get_weelky_tasks( req.body.first_date, req.body.last_date )
			.then( all_tasks => {
				res.status(200).json( all_tasks );
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.put('/create-task', function (req, res) {
		let payload = {
			author: req.body.author,
			content: req.body.content,
			creation_date: moment(),
			date: moment(req.body.date, 'DDMMYYYY').hours(12).toDate(),
			edit_date: moment(),
			meal: req.body.meal,
			url: req.body.url,
		};

		console.log(payload.date);
		new planning_model(payload).save()
			.then( is_task_created => {
				console.log(is_task_created)
				res.status(200).json({message: 'New task added to the database', code: 'task_created', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	router.post('/update-content', function (req, res) {
		let payload = {
				content: req.body.content,
				edit_date: moment()
			};

		console.log( payload );
		planning_model.update_content( req.body.task_url, payload )
			.then( is_content_updated => {
				res.status(200).json({message: 'Content updated', code: 'content_updated', edit_date: payload.edit_date});
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

module.exports = {
	"planning" : router
};