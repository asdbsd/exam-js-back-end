const { loginIndex, login } = require('../controllers/login');
const { body } = require('express-validator');

const loginRouter = require('express').Router();

loginRouter.get('/', loginIndex)
loginRouter.post('/',
    body('email')
        .isEmail().withMessage('Entered value is not a real email'),
    body('password')
        .isLength({ min: 5 }).withMessage('Password must be minimum 5 characters long')
        .notEmpty().withMessage('Location can\'t be blank'),
    login)

module.exports = loginRouter;