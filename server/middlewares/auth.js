const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const jwtAccessKey = process.env.JWT_ACCESS_KEY;


const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            throw createError(401, 'Access token not found. Please login again');
        }

        const decoded = jwt.verify(token, jwtAccessKey);
        if (!decoded) {
            throw createError(401, 'Invalid access token. Please login again');
        }

        req.userId = decoded._id;
        next();
    } catch (err) {
        return next(err);
    }
}

const isLoggedOut = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (token) {
            try {
                const decoded = jwt.verify(token, jwtAccessKey);
                if (decoded) {
                    throw createError(400, 'User already logged in');
                }
            } catch (error) {
                throw error;
            }
        }

        next();
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    isLoggedIn,
    isLoggedOut
}