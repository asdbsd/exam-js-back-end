const session = require('express-session');
const User = require('../models/User');

const registerUser = async (session, email, skills, password) => {
    const user = new User({
        email,
        skills,
        hashedPassword: password
    });

    try {
        await user.save();

        session.user = {
            id: user._id,
            email: user.email,
            skills: user.skills,
        }
    } catch (err) {
        return err;
    }
}

const loginUser = async (session, email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        try {
            await user.comparePassword(password)

            session.user = {
                id: user._id,
                firstName: user.email,
                lastName: user.skills
            }
        } catch (err) {
            return Promise.reject('Incorect username or Password')
        }
    } else {
        return Promise.reject('Incorect username or Password')
    }
}

const logout = (session) => {
    delete session.user;
}

const getUserById = async (id) => {
    try {
        const user = JSON.parse(JSON.stringify((await User.find({ _id: id }))[0]));
        if (user) {
            return user;
        } else {
            throw "User doesn't exist"
        }
    } catch (err) {
        return err;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.find({ email });
        if (user.length > 0) {
            return user;
        } else {
            throw "User doesn't exist"
        }
    } catch (err) {
        return undefined;
    }
}


module.exports = {
    registerUser,
    loginUser,
    logout,
    getUserById,
    getUserByEmail
}