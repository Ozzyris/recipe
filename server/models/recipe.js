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
    preparations: [
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
        .then(is_title_updated =>{
            resolve( is_title_updated );
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
        .then(is_url_updated =>{
            resolve( is_url_updated );
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
        .then(is_summary_updated =>{
            resolve(is_summary_updated);
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
        .then(is_tips_updated =>{
            resolve(is_tips_updated);
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
        .then(is_time_updated =>{
            resolve(is_time_updated);
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
        .then(is_yield_updated =>{
            resolve(is_yield_updated);
        })
    })
};
//ILLUSTRATION
recipe.statics.update_illustration = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            illustration: payload.illustration,
            edit_date: payload.edit_date

        }).exec()
        .then(is_illustration_updated =>{
            resolve(is_illustration_updated);
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
        .then(is_tag_updated =>{
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
        .then(is_tag_deleted =>{
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

//PREPARATION
recipe.statics.count_preparations = function(recipe_id){
    return new Promise((resolve, reject) => {
        recipe.findOne({ _id: recipe_id }).exec()
            .then( recipe => {
                resolve( recipe.preparations.length );
            })
    })
};
recipe.statics.add_preparation = function(recipe_id, payload, edit_date){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id }, {
            $push:{
                'preparations': payload
            },
            edit_date: edit_date
        }).exec()
        .then (is_preparation_added => {
            resolve( is_preparation_added );
        })
    })
};
recipe.statics.update_preparation = function(recipe_id, payload){
    return new Promise((resolve, reject) => {
        recipe.updateOne({ _id: recipe_id, 'preparations._id': payload.preparation_id }, {
            $set: { 
                "preparations.$.step" : payload.step,
                "preparations.$.order" : payload.order,
            },
            edit_date: payload.edit_date
        }).exec()
        .then ( is_preparation_updated => {
            resolve( is_preparation_updated );
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
        recipe.find({url: recipe_url}, {'_id':1, 'title':1, 'url':1, 'edit_date': 1, 'illustration':1, 'summary':1, 'time':1, 'yield':1, 'tips':1, 'tags':1, 'ingredients':1, 'preparations':1}).exec()
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