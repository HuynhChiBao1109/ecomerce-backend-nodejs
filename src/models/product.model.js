'use strict'

const { model, Schema } = require('mongoose')
const slug = require('slugify');

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
    product_slug: String,
    product_ratingAvg: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be greater than 0'],
        max: [5, 'Rating must be less than 5'],
        set: value => Math.round(value * 10) / 10
    },
    product_variations: { type: Array, default: [] },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
// define slug
productSchema.pre('save', function (next) {
    this.product_slug = slug(this.product_name);
    next();
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