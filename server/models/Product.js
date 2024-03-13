const { Schema, model } = require('mongoose');

const productSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Product = model('Product', productSchema);

module.exports = Product;