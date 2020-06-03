const express = require('express');
const mongoose = require('mongoose');
const {Comment, validateComment} = require('../models/commentModel');
const {Article} = require('../models/articleModel');

const router = express.Router();

router.post('/:articleId', async (req, res) => {
    const {error} = validateComment(req.body);
    if (error) res.status(400).send('Bad Request');

    const article = await Article.findById(req.params.articleId);
    if (!article) res.status(404).send('The article was not Found !');

    let comment = new Comment({
        author: req.body.author,
        text: req.body.text,
    });
    article.comments.push(comment);
    const updatedArticle = await article.save();
    res.send(updatedArticle);
});


module.exports = router;