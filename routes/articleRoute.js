const express = require('express');
const mongoose = require('mongoose');
const {Article, validateArticle} = require('../models/articleModel');
// const {Comment} = require('../models/commentModel');

const router = express.Router();

router.get('/', async (req, res) => {
    const articles = await Article.find();
    res.send(articles);
});

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) res.status(404).send('The article was not Found !');
    res.send(article);
});

router.delete('/:id', async (req, res) => {
    const article = await Article.findByIdAndRemove(req.params.id);
    if (!article) res.status(404).send('The article was not Found !');
    res.send(article);
});

router.post('/', async (req, res) => {
    const {error} = validateArticle(req.body);
    if (error) res.status(400).send('Bad Request');

    let article = new Article({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
    })
    const addedArticle = await article.save();
    res.send(addedArticle);
});
router.put('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) res.status(404).send('The article was not Found !');

    const {error} = validateArticle(req.body);
    if (error) res.status(400).send('Bad Request');

    article.title = req.body.title;
    article.author = req.body.author;
    article.content = req.body.content;

    const updatedArticle = await article.save();
    res.send(updatedArticle);

});


module.exports = router;