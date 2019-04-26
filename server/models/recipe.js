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
    tags: {type: Array, default: "Add a tag"},
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
            edit_date: payload.edit_date
        })
        .exec()
        .then(session =>{
            resolve( true );
        })
    })
};
//URL
recipe.statics.update_url = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id : recipe_id }, {
            url: payload.url,
            edit_date: payload.edit_date
        })
        .exec()
        .then(session =>{
            resolve( true );
        })
    })
};
//SUMMARY
recipe.statics.update_summary = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            summary: payload.summary,
            edit_date: payload.edit_date

        }).exec()
        .then(session =>{
            resolve(true);
        })
    })
};
//TIPS
recipe.statics.update_tips = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            tips: payload.tips,
            edit_date: payload.edit_date

        }).exec()
        .then(session =>{
            resolve(true);
        })
    })
};
//TIME
recipe.statics.update_time = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            time: payload.time,
            edit_date: payload.edit_date
        }).exec()
        .then(session =>{
            resolve(true);
        })
    })
};
//YIELD
recipe.statics.update_yield = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            yield: payload.yield,
            edit_date: payload.edit_date

        }).exec()
        .then(session =>{
            resolve(session);
        })
    })
};
//TAGS
recipe.statics.add_tag = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            $push:{
                tags: payload.tag
            },
            edit_date: payload.edit_date
        }).exec()
        .then(session =>{
            resolve(session);
        })
    })
};
recipe.statics.delete_tag = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            $pull: { 
                "tags" : payload.tag,
            },
            edit_date: payload.edit_date
        }).exec()
        .then(session =>{
            resolve(session);
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
recipe.statics.add_ingredient = function(recipe_id, payload, edit_date){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            $push:{
                'ingredients': payload
            },
            edit_date: edit_date
        }).exec()
        .then (is_ingredient_added => {
            resolve( is_ingredient_added );
        })
    })
};
recipe.statics.update_ingredient = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id, 'ingredients._id': payload.ingredient_id }, {
            $set: { 
                "ingredients.$.name" : payload.name,
                "ingredients.$.order" : payload.order,
            },
            edit_date: payload.edit_date
        }).exec()
        .then ( is_ingredient_updated => {
            resolve( is_ingredient_updated );
        })
    })
};
recipe.statics.delete_ingredient = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id, 'ingredients.$._id': payload.ingredient_id }, {
            $pull: { 
                "ingredients" : payload.ingredient,
            },
            edit_date: payload.edit_date
        }).exec()
        .then (is_ingredient_deleted => {
            resolve( is_ingredient_deleted );
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
        recipe.find({url: recipe_url}, {'title':1, 'url':1, 'edit_date': 1, 'illustration':1, 'summary':1, 'time':1, 'yield':1, 'tips':1, 'tags':1, 'ingredients':1, 'preparation':1}).exec()
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