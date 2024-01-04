const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const conpression = require('compression');
const app = express();

// init middlewares 
app.use(morgan('combined'));
app.use(helmet());
app.use(conpression());
// init db
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();
// init route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'hello world'
    });
});

module.exports = app;