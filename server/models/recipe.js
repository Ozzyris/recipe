var mongoose = require("./mongoose"),
    moment = require('moment'),
    Promise = require('bluebird');

var recipe = new mongoose.Schema({
    title: {type: String},
    summary: {type: String},
    time: {type: String},
    yield: {type: String},
    illustration: {type: String},
    tips: {type: String},
    tags: {type: String, default: "[\"Add a tag\"]"},
    creation_date: {type: Date, default: moment()},
    edit_date: {type: Date, default: moment()},
    url: {type: String},
    ingredients: [
        {
            name: {type: String},
            order: {type: Number},
        }
    ],
    preparation: [
        {
            step: {type: String},
            order: {type: Number},
        }
    ]
}, {collection: 'recipe'});


var recipe = mongoose.DB.model('recipe', recipe);

module.exports.recipe = recipe