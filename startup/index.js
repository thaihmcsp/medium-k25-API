const indexRoute = require('../routes/index');
const mongoose = require('mongoose');

exports.startup = async function (app) {
    app.use('/api/v1', indexRoute);
    await mongoose.connect('mongodb://localhost/my_database', () => {
        console.log('mongoDB connected');
    });
}