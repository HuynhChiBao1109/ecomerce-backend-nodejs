'use strict'

const { CREATED } = require('../core/sucess.response');
const { createProduct } = require('../services/product.service');

class ProductController {

    createNewProduct = async (req, res, next) => {
        new CREATED({
            message: 'Create new product successfully',
            metadata: await createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user._id
            })
        }).send(res);
    }
}

module.exports = new ProductController();