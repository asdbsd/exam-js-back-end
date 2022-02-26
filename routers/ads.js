const adsRouter = require('express').Router();
const { body } = require('express-validator');
const { isLoggedIn } = require('../middlewares/session');

const { adsIndex, createIndex, create, adDetails, edit, editIndex, apply } = require('../controllers/ads');
const { del } = require('../controllers/delete');
const errorIndex = require('../controllers/error');

adsRouter.get('/', adsIndex);

adsRouter.get('/create', isLoggedIn(), createIndex);
adsRouter.post('/create', isLoggedIn(),
    body('headline')
        .isLength({ min: 4 }).withMessage('Headline must be minimum 4 characters long')
        .notEmpty().withMessage('Headline can\'t be blank'),
    body('location')
        .isLength({ min: 8 }).withMessage('Location must be minimum 8 characters long')
        .notEmpty().withMessage('Location can\'t be blank'),
    body('companyName')
        .isLength({ min: 3 }).withMessage('Company Name must be minimum 3 characters long')
        .notEmpty().withMessage('Company name can\'t be blank'),
    body('companyDescription')
        .isLength({ max: 40 }).withMessage('description must be maximum 40 characters long')
        .notEmpty().withMessage('Company description can\'t be blank'),
    create);

adsRouter.get('/:id', adDetails);

adsRouter.get('/edit/:id', isLoggedIn(), editIndex);
adsRouter.post('/edit/:id', isLoggedIn(),
    body('headline')
        .isLength({ min: 4 }).withMessage('Headline must be minimum 4 characters long')
        .notEmpty().withMessage('Headline can\'t be blank'),
    body('location')
        .isLength({ min: 8 }).withMessage('Location must be minimum 8 characters long')
        .notEmpty().withMessage('Location can\'t be blank'),
    body('companyName')
        .isLength({ min: 3 }).withMessage('Company Name must be minimum 3 characters long')
        .notEmpty().withMessage('Company name can\'t be blank'),
    body('companyDescription')
        .isLength({ max: 40 }).withMessage('description must be maximum 40 characters long')
        .notEmpty().withMessage('Company description can\'t be blank'),
    edit)
adsRouter.get('/edit', errorIndex);


adsRouter.get('/apply/:id', isLoggedIn(), apply);

adsRouter.get('/delete/:id', isLoggedIn(), del);

module.exports = adsRouter;