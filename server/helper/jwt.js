const jwt = require('jsonwebtoken');

const createJSONWebToken = (payload, secretKey, expiresIn) => {
    if (typeof payload !== 'object' || !payload) {
        throw new Error('Payload must be a non-empty object');
    }

    if (typeof secretKey !== 'string' || secretKey === '') {
        throw new Error('Secret key must be a non-empty string');
    }

    try {
        const token = jwt.sign(payload, secretKey, { expiresIn });
        return token;
    } catch (err) {
        console.error('Failed to sign the jwt', err);
        throw err;
    }
}


module.exports = { createJSONWebToken };