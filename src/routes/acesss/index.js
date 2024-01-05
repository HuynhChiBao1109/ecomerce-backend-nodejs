'use strict'

const express = require('express');
const acessController = require('../../controllers/acess.controller');
const router = express.Router();

// signup
router.post('/shop/signup', acessController.signUp);

module.exports = router;