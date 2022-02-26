const { validationResult, body } = require('express-validator');

const loginIndex = (req, res) => {
    res.render('login', { title: 'Login Page' });
};

const login = async (req, res) => {
    const { errors } = validationResult(req);

    try {
        if (errors.length > 0) {
            throw errors;
        }

        await req.auth.loginUser(req.body.email, req.body.password)
        res.redirect('/');
    } catch(err) {
        res.locals.errors = err
        res.render('login', { title: 'Login Page' });
    }
}

module.exports = {
    loginIndex,
    login
}