const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const passport = require("passport");
// const session = require("express-session");

const middlewares = [
    // cookieParser(),
    // cors({
    //     origin: process.env.CLIENT_URL,
    //     credentials: true
    // }),
    morgan('dev'),
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    // session({
    //     secret: process.env.SECRET_KEY,
    //     resave: false,
    //     saveUninitialized: true
    // }),
    // passport.initialize(),
    // passport.session()
];

module.exports = (app) => {
    middlewares.forEach(middleware => app.use(middleware));
};