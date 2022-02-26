const { registerUser, loginUser, logout, getUserById, getUserByEmail } = require('../services/userService');

const userMiddleware = () => {
    return (req, res, next) => {
        req.auth = {
            registerUser: (...params) => registerUser(req.session, ...params),
            loginUser: (...params) => loginUser(req.session, ...params),
            logout: () => logout(req.session),
            getUserById,
            getUserByEmail
        };
        
        if(req.session.user) {
            res.locals.user = req.session.user;
            res.locals.hasUser = true;
        };

        next();
    }
}

module.exports = userMiddleware;