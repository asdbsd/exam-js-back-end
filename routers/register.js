const { registerIndex, register } = require("../controllers/register");
const { body } = require('express-validator');

const registerRouter = require('express').Router();

registerRouter.get('/', registerIndex)
registerRouter.post('/',
    body('skills')
        .isLength({ max: 40 }).withMessage('Skills must be maximum 40 characters long'),
    body('email')
        .isEmail().withMessage('Entered value is not a real email')
        .notEmpty().withMessage('Please make sure to enter an email'),
    body('password')
        .isLength({ min: 5 }).withMessage('Password must exist!')
        .custom((value, { req }) => {
            return value === req.body.repass
        }).withMessage('Passwords doesn\'t match'), register)

module.exports = registerRouter;