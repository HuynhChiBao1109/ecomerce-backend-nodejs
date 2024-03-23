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
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true }
}, {
    collection: 'Clothes',
    timestamps: true
});
// define the product type = electronics
const electronicsSchema = new Schema({
    brand: { type: String, require: true },
    model: String,
    color: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true }
}, {
    collection: 'Electronics',
    timestamps: true
});
// define the product type = furniture
const furnitureSchema = new Schema({
    brand: { type: String, require: true },
    model: String,
    color: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true }
}, {
    collection: 'Furniture',
    timestamps: true
});

module.exports = {
    productModel: model(DOCUMENT_NAME, productSchema),
    clothingModel: model('Clothing', clothingSchema),
    electronicModel: model('Electronics', electronicsSchema),
    furnitureModel: model('Furniture', furnitureSchema)
}