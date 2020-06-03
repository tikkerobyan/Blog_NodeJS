const Joi = require('joi');
const mongoose = require('mongoose');

const commentModel = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 45,
    },
    text: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 600,
    }
});

const Comment = mongoose.model('Comments',commentModel);

function validateComment(comment) {
    const model = {
        author: Joi.string().min(2).max(45).required(),
        text: Joi.string().min(2).max(600).required(),
    };

    return Joi.validate(comment, model);
}

exports.Comment = Comment;
exports.validateComment = validateComment;
exports.commentModel = commentModel;