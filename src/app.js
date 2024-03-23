require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const conpression = require('compression');
const app = express();
// init middlewares 
app.use(morgan('combined'));
app.use(helmet());
app.use(conpression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// init db
require('./dbs/init.mongodb');
// const { checkOverload } = require('./helpers/check.connect');
// checkOverload();

// init route
app.use('/v1/api', require('./routes'));

// handle error 
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app;