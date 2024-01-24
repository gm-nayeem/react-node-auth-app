const createError = require('http-errors');
const User = require('../models/User');

const checkUserExists = async (email) => {
    try {
        const userExists = await User.findOne({ email });
        if (!userExists) {
            throw createError(404, 'Email is incorrect or you have not verified your email address. Please registered yourself first.')
        }

        return userExists;
    } catch (error) {
        throw error;
    }
}

module.exports = checkUserExists;