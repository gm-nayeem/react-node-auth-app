const router = require("express").Router();
const passport = require("passport");
const createError = require('http-errors');

const {
    registerController,
    loginController,
    logoutController
} = require('../controllers/authController');
const { isLoggedIn, isLoggedOut } = require('../middlewares/auth');
const { errorResponse, successResponse } = require('../controllers/responseController');
const { createJSONWebToken } = require("../helper/jwt");
const { setAccessTokenCookie } = require("../helper/cookie");

// custom login
router.post('/register', isLoggedOut, registerController);

router.post('/login', isLoggedOut, loginController);

router.post('/logout', isLoggedIn, logoutController);


// google provider
router.get("/login/success", (req, res) => {
    // console.log('login success: ', req.user);

    if (req.user) {
        return successResponse(res, {
            statusCode: 200,
            message: 'Succssfully logged in',
            payload: {
                user: req.user
            }
        })
    }
});

router.get("/login/failed", (req, res) => {
    return errorResponse(res, {
        statusCode: 401,
        message: "login failure!",
    });
});

router.get("/logout", (req, res) => {
    try {
        req.logout((err) => {
            if (err) {
                return next(createError(500, 'Logout failed!'));
            }

            res.clearCookie('accessToken');
            res.redirect(process.env.CLIENT_URL);
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: error.message
        });
    }
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login/failed",
    }),
    (req, res) => {
        // create jwt for access token
        const accessToken = createJSONWebToken(
            {
                _id: req.user._id,
            },
            process.env.JWT_ACCESS_KEY,
            '2d'
        );

        // set cookie for access token
        setAccessTokenCookie(res, accessToken);

        // redirect to user home page
        res.redirect(process.env.CLIENT_URL);
    }
);


module.exports = router;
