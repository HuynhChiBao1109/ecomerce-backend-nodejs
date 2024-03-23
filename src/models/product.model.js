'use strict'

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_description: String,
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: ['Clothing', 'Electronics', 'Funiture'] },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
    product_attributes: { type: Schema.Types.Mixed, require: true },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
// define the product type = clothing
const clothingSchema = new Schema({
    brand: { type: String, require: true },
    size: String,
    material: String
}, {
    collection: 'Clothes',
    timestamps: true
});
// define the product type = electronics
const electronicsSchema = new Schema({
    brand: { type: String, require: true },
    model: String,
    color: String
}, {
    collection: 'Electronics',
    timestamps: true
});
// define the product type = furniture
const furnitureSchema = new Schema({
    brand: { type: String, require: true },
    model: String,
    color: String
}, {
    collection: 'Furniture',
    timestamps: true
});

module.exports = {
    Product: model(DOCUMENT_NAME, productSchema),
    Clothing: model('Clothing', clothingSchema),
    Electronic: model('Electronics', electronicsSchema),
    Furniture: model('Furniture', furnitureSchema)
}