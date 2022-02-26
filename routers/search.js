const {searchIndex, search} = require('../controllers/search');
const { isLoggedIn } = require('../middlewares/session');

const searchRouter = require('express').Router();

searchRouter.get('/', isLoggedIn(), searchIndex);
searchRouter.post('/', isLoggedIn(), search);


module.exports = searchRouter;