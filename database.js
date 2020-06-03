const mongoose = require('mongoose');

async function connect() {
    try {
        const connection = await mongoose.connect('mongodb://localhost/blog', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to Database');
    } catch (e) {
        console.log(e);
    }
}

module.exports.connect = connect;