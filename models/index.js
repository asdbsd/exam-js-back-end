const mongoose = require('mongoose');
const connectingString = 'mongodb://127.0.0.1:27017/ads';

require('./User');
require('./Ad');

const initDb = async () => {
    try {
        await mongoose.connect(connectingString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        });
        console.log('DB Connected!');

    } catch(err) {
        console.log('Database connection error');
        process.exit(1)
    }
};

module.exports = initDb;