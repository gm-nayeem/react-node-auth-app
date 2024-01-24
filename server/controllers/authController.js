const bcrypt = require('bcryptjs');
const createError = require('http-errors');

const User = require('../models/User');
const { successResponse } = require('./responseController');
const { createJSONWebToken } = require('../helper/jwt');
const { setAccessTokenCookie } = require('../helper/cookie');
const checkUserExists = require('../helper/checkUserExists');

const registerController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw createError(500, 'Invalid credentials');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            accountType: 'custom'
        });
        if (!newUser) {
            throw createError(500, 'Invalid credentials');
        }

        return successResponse(res, {
            statusCode: 201,
            message: 'User was registered successfully'
        });
    } catch (err) {
        next(err);
    }
}

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await checkUserExists(email);

        if (!user) {
            throw createError(404, 'User does not exist with this email. Please register first');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw createError(401, 'Email or Password mismatch');
        }

        // create jwt for access token
        const accessToken = createJSONWebToken(
            {
                _id: user._id,
            },
            process.env.JWT_ACCESS_KEY,
            '2d'
        );

        // set cookie for access token
        setAccessTokenCookie(res, accessToken);

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return successResponse(res, {
            statusCode: 200,
            message: 'User logged in successfully',
            payload: {
                user: userWithoutPassword
            }
        });
    } catch (err) {
        next(err);
    }
}

const logoutController = async (req, res, next) => {
    try {
        res.clearCookie('accessToken');

        return successResponse(res, {
            statusCode: 200,
            message: 'User logged out successfully',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController
}