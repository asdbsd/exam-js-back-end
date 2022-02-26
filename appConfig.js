const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const userMiddleware = require('./middlewares/userMiddleware');
const adMiddleware = require('./middlewares/adMiddleware');

const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');
const adsRouter = require('./routers/ads');
const registerRouter = require('./routers/register');
const { staticRouter } = require('./routers/static');
const errorRouter = require('./routers/error');
const searchRouter = require('./routers/search');

const app = express();

// App config
app.engine('.hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');

app.use(session({
    secret: 'secretString',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

// Middlewares
app.use(userMiddleware());
app.use(adMiddleware());

// Routes config
app.use(express.urlencoded({ extended: true }));
app.use('*/static', express.static('static'));

app.use('/', staticRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/all-ads', adsRouter);
app.use('/search', searchRouter)
app.use('*', errorRouter);


module.exports = app;
