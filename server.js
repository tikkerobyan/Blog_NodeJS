const express = require('express');
const morgan = require('morgan');
const database = require('./database');
const articleRoute = require('./routes/articleRoute')
const commentRoute = require('./routes/commentRoute')

const app = express();

database.connect();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/article', articleRoute);
app.use('/comment', commentRoute);


app.listen(3000, () => console.log('Listening port 3000'))
