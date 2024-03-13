const Customer = require('../models/Customer');
const { successResponse } = require('./responseController');

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
        const customers = await Customer.find();

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
    createCustomer,
    deleteCustomer,
    getAllCustomer
}
