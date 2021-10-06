/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const passportGoogle = require("passport-google-oauth20");
const User = require("../model/user/user.model");

const GoogleStrategy = passportGoogle.Strategy;
const GOOGLE_CALLBACK_URL = "/api/auth/google/callback";

function configPassport(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: GOOGLE_CALLBACK_URL,
                passReqToCallback: true,
            },
            async (accessToken, refreshToken, params, profile, cb) => {
                try {
                    let user = await User.findOne({ googleId: profile.id });
                    if (user) {
                        return cb(null, user);
                    } else {
                        const newUser = {
                            googleId: profile.id,
                            username: profile.displayName,
                            avatar: profile.photos[0].value,
                            email: profile.emails[0].value,
                        };
                        user = new User(newUser);
                        user.save();
                        return cb(null, user);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )
    );

    passport.serializeUser((user, cb) => {
        cb(null, user._id);
    });

    passport.deserializeUser((id, cb) => {
        User.findById(id).then((user) => {
            cb(null, user);
        });
    });
}

module.exports = configPassport;
