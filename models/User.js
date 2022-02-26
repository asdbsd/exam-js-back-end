const { Schema, model, Types: { ObjectId }} = require('mongoose');
const { comparePasswords, hashPassword } = require('./utils');

const userSchema = new Schema({
    email: { type: String },
    hashedPassword: { type: String, length: { min: [4, 'Password must be minimum 4 characters long!'] }},
    skills: { type: String, length: { min: [3, 'First name must be minimum 3 characters long!'] }},
    myAds: { type: [ObjectId], default: [], ref: 'Post' }
});

userSchema.methods.comparePassword = async function(password) {
    return comparePasswords(password, this.hashedPassword)
}

userSchema.pre('save', async function(next) {
    if(this.isModified('hashedPassword')) {
        this.hashedPassword = await hashPassword(this.hashedPassword);
    }
    next();
});


const User = model('User', userSchema);

module.exports = User;
