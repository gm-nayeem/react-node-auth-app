require("dotenv").config();
const express = require('express');
const createError = require('http-errors');

require("./config/passport");
// const proxy = require('./config/setupProxy');
const authRoute = require('./routes/authRoute');

const middlewares = require('./middlewares');
const { errorResponse } = require('./controllers/responseController');

const app = express();

// set middlewares 
middlewares(app);
// proxy(app);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is working properly'
    });
});

// set routes
app.use('/api/auth', authRoute);

// client error handling
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
    next();
});

// server error handling
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    });
});


module.exports = app;
