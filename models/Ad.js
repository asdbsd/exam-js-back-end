const { Schema, model, Types: { ObjectId } } = require('mongoose');

const adSchema = new Schema({
    headline: { type: String, required: true },
    location: { type: String, required: true },
    companyName: { type: String, required: true },
    companyDescription: { type: String, required: true },
    author: { type: ObjectId, ref: 'User' },
    users: { type: [ ObjectId ], default: [], ref: 'User' },
});


const Ad = model('Ad', adSchema);

module.exports = Ad;