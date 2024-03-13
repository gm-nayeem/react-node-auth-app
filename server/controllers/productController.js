const Product = require('../models/Product');
const { successResponse } = require('./responseController');

const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);

        return successResponse(res, {
            statusCode: 201,
            message: 'Product created successfully',
            payload: newProduct
        });
    } catch (err) {
        next(err);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            { new: true }
        );

        return successResponse(res, {
            statusCode: 200,
            message: 'Product updated successfully',
            payload: updatedProduct
        });
    } catch (err) {
        next(err);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndDelete(id);
        return successResponse(res, {
            statusCode: 200,
            message: 'Product deleted successfully',
        });
    } catch (err) {
        next(err);
    }
}

const getSingleProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        successResponse(res, {
            statusCode: 200,
            message: 'Retured single product',
            payload: product
        });
    } catch (err) {
        next(err);
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find();

        successResponse(res, {
            statusCode: 200,
            message: 'Retured all products',
            payload: products
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    getAllProduct
}
