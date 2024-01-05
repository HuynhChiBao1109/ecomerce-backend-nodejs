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
app.use('/', require('./routes'));
module.exports = app;