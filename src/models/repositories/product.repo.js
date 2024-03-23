'use strict'

const { clothingModel, electronicModel, furnitureModel, productModel } = require('../product.model');

const findAllDraftsForShop = async ({ query, limit, skip }) => {
    return productModel
        .find(query)
        .limit(limit)
        .skip(skip)
        .sort({ updateAt: -1 })
        .populate('product_shop', 'name email')
        .lean();
}


module.exports = {
    findAllDraftsForShop
}