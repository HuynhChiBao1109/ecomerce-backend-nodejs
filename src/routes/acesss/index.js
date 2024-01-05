'use strict'

const express = require('express');
const acessController = require('../../controllers/acess.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const router = express.Router();

// signup
router.post('/shop/signup', asyncHandler(acessController.signUp));

module.exports = router;