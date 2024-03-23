'use strict'

const { clothingModel, electronicModel, furnitureModel, productModel } = require('../models/product.model');
const { BadRequestError } = require('../core/error.response');
const { findAllDraftsForShop } = require('../models/repositories/product.repo');

class ProductFactory {

    static productRegistry = {}

    static registerProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef;
    }

    static createProduct(type, payload) {
        const productClass = ProductFactory.productRegistry[type];
        if (!productClass) throw new BadRequestError(`Invalid product type ${type}`);

        return new productClass(payload).createProduct();
    }

    static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true }
        return await findAllDraftsForShop({ query, limit, skip })
    }
}

class Product {
    constructor({
        product_name, product_thumb, product_price, product_description,
        product_quantity, product_type, product_shop, product_attributes
    }) {
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
        const newProduct = await productModel.create(this)
        if (!newProduct) throw new BadRequestError('Create product failed');

        return newProduct;
    }
}

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothingModel.create({
            ...this.product_attributes,
            product_shop: this.product_shop

        });
        if (!newClothing) throw new BadRequestError('Create clothing failed');

        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('Create product failed');

        return newProduct;
    }
}

class Electronic extends Product {
    async createProduct() {
        const newElectronic = await electronicModel.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!newElectronic) throw new BadRequestError('Create electronic failed');

        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('Create product failed');

        return newProduct;
    }
}

class Furniture extends Product {
    async createProduct() {
        const newFurniture = await furnitureModel.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!newFurniture) throw new BadRequestError('Create furniture failed');

        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('Create product failed');

        return newProduct;
    }
}

ProductFactory.registerProductType('Clothing', Clothing);
ProductFactory.registerProductType('Electronics', Electronic);
ProductFactory.registerProductType('Furniture', Furniture);

module.exports = ProductFactory;