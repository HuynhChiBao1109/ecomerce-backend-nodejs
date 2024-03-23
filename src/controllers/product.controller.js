'use strict'

const { CREATED } = require('../core/sucess.response');

class ProductController {

    createNewProduct = async (req, res, next) => {
        new CREATED({
            message: 'Create new product successfully',
            metadata: await AuthenService.logout({ keyStore: req.keyStore })
        }).send(res);
    }
}

module.exports = new ProductController();