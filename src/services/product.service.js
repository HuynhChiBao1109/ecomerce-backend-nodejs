'use strict'

const { Product, Clothing, Electronic, Furniture } = require('../models/product.model');

class ProductFactory {
    static createProduct() {

    }
}

/**
 *  product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_description: String,
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: ['Clothing', 'Electronics', 'Funiture'] },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
    product_attributes: { type: Schema.Types.Mixed, require: true },
 */

class Product {
    constructor(
        product_name, product_thumb, product_price, product_description,
        product_quantity, product_type, product_shop, product_attributes
    ) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_price = product_price;
        this.product_description = product_description;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }

    async createProduct() {
        return await Product.create(this);
    }
}