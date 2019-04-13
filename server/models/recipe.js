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

//TITLE
recipe.statics.update_title = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id : recipe_id }, {
            title: payload.title,
            url: payload.url,
            edit_date: moment()
        })
        .exec()
        .then(session =>{
            resolve( true );
        })
    })
};
//SUMMARY
recipe.statics.update_summary = function(recipe_id, summary){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            summary: summary,
            edit_date: moment()

        }).exec()
        .then(session =>{
            resolve(true);
        })
    })
};
//TIPS
recipe.statics.update_tips = function(recipe_id, tips){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            tips: tips,
            edit_date: moment()

        }).exec()
        .then(session =>{
            resolve(true);
        })
    })
};
//TIME
recipe.statics.update_time = function(recipe_id, time){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            time: time,
            edit_date: moment()

        }).exec()
        .then(session =>{
            resolve(true);
        })
    })
};
//YIELD
recipe.statics.update_yield = function(recipe_id, yield){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            yield: yield,
            edit_date: moment()

        }).exec()
        .then(session =>{
            resolve(true);
        })
    })
};
//TAGS
recipe.statics.update_tags = function(recipe_id, tags){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            tags: tags,
            edit_date: moment()

        }).exec()
        .then(session =>{
            resolve(true);
        })
    })
};
//INGREDIENTS
recipe.statics.count_ingredients = function(recipe_id){
    return new Promise((resolve, reject) => {
        recipe.findOne({ _id: recipe_id }).exec()
        .then( recipe => {
            resolve( recipe.ingredients.length );
        })
    })
};
recipe.statics.add_ingredients = function(recipe_id, ingredient){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
                $push:{
                    'ingredients': ingredient
                }
            }).exec()
            .then (wallet => {
                resolve( true );
            })
    })
};
recipe.statics.update_ingredients = function(recipe_id, ingredient){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id, 'ingredients._id': ingredient.id }, 
            { $set: 
                { 
                    "ingredients.$.name" : ingredient.name,
                    "ingredients.$.order" : ingredient.order,
                }
            }).exec()
            .then (ingredient => {
                resolve( true );
            })
    })
};
recipe.statics.remove_ingredients = function(recipe_id, ingredient){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id, 'ingredients._id': ingredient.id }, 
            { pull: 
                { 
                    "ingredients.$" : ingredient,
                }
            }).exec()
            .then (ingredient => {
                resolve( true );
            })
    })
};

//PUBLIC
recipe.statics.get_all_recipes = function(){
    return new Promise((resolve, reject) => {
        recipe.find({}, {'title':1, 'url':1, 'illustration':1, 'tags':1}).exec()
            .then(articles => {
                if( articles ){
                    resolve( articles );
                }else{
                    reject({ message: 'Error accessing all recipes', code: 'error_all_recipes'});
                }
            })
    })
};
recipe.statics.get_recipes = function(recipe_url){
    return new Promise((resolve, reject) => {
        recipe.find({url: recipe_url}, {'title':1, 'url':1, 'illustration':1, 'summary':1, 'time':1, 'yield':1, 'tips':1, 'tags':1, 'ingredients':1, 'preparation':1}).exec()
            .then(articles => {
                if( articles ){
                    resolve( articles );
                }else{
                    reject({ message: 'Error accessing the recipe', code: 'error_recipe'});
                }
            })
    })
};


var recipe = mongoose.DB.model('recipe', recipe);

module.exports.recipe = recipe