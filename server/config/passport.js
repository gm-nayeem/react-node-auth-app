require("dotenv").config();
const User = require("../models/User");
const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, cb) => {
            const {
                emails, photos
            } = profile;

            try {
                const user = await User.findOne({
                    email: emails[0].value
                });

                if (user) {
                    return cb(null, user);
                }

                const newUser = await User.create({
                    email: emails[0].value,
                    profilePic: photos[0].value,
                    accountType: 'google'
                });
                return cb(null, newUser);
            } catch (err) {
                return cb(err, null);
            }
        }
    )
);

// create session email
// whenever we login it creates user email inside session
passport.serializeUser((user, done) => {
    done(null, user.email);
});

// find session info using session email
passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findOne({ email }).select('-password');
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});