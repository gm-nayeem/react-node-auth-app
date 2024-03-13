const { Schema, model } = require('mongoose');

const customerSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: Number,
    },
    phone: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Customer = model('Customer', customerSchema);

module.exports = Customer;