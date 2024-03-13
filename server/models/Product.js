const { Schema, model } = require('mongoose');

const productSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
}, { timestamps: true });

const Product = model('Product', productSchema);

module.exports = Product;