const createError = require('http-errors');
const Customer = require('../models/Customer');
const { successResponse } = require('./responseController');

const loginCustomer = async (req, res, next) => {
    try {
        const {
            name, password
        } = req.body;

        if (!name || !password) {
            return createError(404, 'Invalid Creadentials!');
        }

        const customer = await Customer.findOne({ name });
        if (!customer) {
            return createError(404, 'User not found!');
        }

        if (password !== customer.password) {
            return createError(500, 'Invalid Creadentials!');
        }

        return successResponse(res, {
            statusCode: 201,
            message: 'Customer created successfully',
            payload: customer
        });
    } catch (err) {
        next(err);
    }
}

const createCustomer = async (req, res, next) => {
    try {
        const newCustomer = await Customer.create(req.body);

        return successResponse(res, {
            statusCode: 201,
            message: 'Customer created successfully',
            payload: newCustomer
        });
    } catch (err) {
        next(err);
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Customer.findByIdAndDelete(id);

        return successResponse(res, {
            statusCode: 200,
            message: 'Customer deleted successfully',
        });
    } catch (err) {
        next(err);
    }
}

const getAllCustomer = async (req, res, next) => {
    try {
        const customers = await Customer.find({ isAdmin: false });

        successResponse(res, {
            statusCode: 200,
            message: 'Retured all customers',
            payload: customers
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    loginCustomer,
    createCustomer,
    deleteCustomer,
    getAllCustomer
}
