const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../helpers/asyncHandler')
const AuthenController = require('../controllers/authen.controller')

router.post('/login', asyncHandler(AuthenController.login))

router.post('/signup', asyncHandler(AuthenController.signUp))

router.post('/logout', asyncHandler(AuthenController.logout))


module.exports = router;