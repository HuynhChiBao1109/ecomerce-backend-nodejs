'use strict'

const { CREATED, Ok } = require('../core/sucess.response');
const { createProduct, findAllDraftsForShop } = require('../services/product.service');

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

    findALlDraftsForShop = async (req, res, next) => {
        new Ok({
            message: 'Find all drafts for shop successfully',
            metadata: await findAllDraftsForShop({
                product_shop: req.user._id,
            }),
        }).send(res);
    }
}

module.exports = new ProductController();