const { homeController } = require('../controllers/static');

const staticRouter = require('express').Router();

staticRouter.get('/', homeController);

module.exports = {
    staticRouter
}