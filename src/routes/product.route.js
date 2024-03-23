const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../helpers/asyncHandler');
const { authentication } = require('../middlewares/authen.middleware');
const ProductController = require('../controllers/product.controller');

router.use(authentication);

router.post('/', asyncHandler(ProductController.createNewProduct));

router.get('/drafts', asyncHandler(ProductController.findALlDraftsForShop));

module.exports = router;