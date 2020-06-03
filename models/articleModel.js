const Joi = require('joi');
const mongoose = require('mongoose');
const {commentModel} = require('./commentModel');


const Article = mongoose.model('Articles', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 45
    },
    author: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 45
    },
    content: {
        type: String,
        required: true,
        minlength: 2
    },
    comments: [{type: commentModel, required: false}]
}));

function validateArticle(article) {
    const model = {
        title: Joi.string().min(2).max(45).required(),
        author: Joi.string().min(2).max(45).required(),
        content: Joi.string().min(2).required()
    };
    return Joi.validate(article, model);
}

exports.Article = Article;
exports.validateArticle = validateArticle;