'use strict'

const express = require('express');
const acessController = require('../../controllers/acess.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

// login
router.post('/shop/login', asyncHandler(acessController.login));
// signup
router.post('/shop/signup', asyncHandler(acessController.signUp));
// authentication check token for logout
router.use(authentication);
// logout
router.post('/shop/logout', asyncHandler(acessController.logout));
module.exports = router;