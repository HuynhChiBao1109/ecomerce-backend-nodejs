'use strict'

const express = require('express');
const acessController = require('../../controllers/acess.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const router = express.Router();

// login
router.post('/shop/login', asyncHandler(acessController.login));
// signup
router.post('/shop/signup', asyncHandler(acessController.signUp));

module.exports = router;