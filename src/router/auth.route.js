const express = require("express");
const passport = require("passport");
const authRoute = express.Router();
const {
    signup,
    login,
    forgotPassword,
    resetPassword,
    refreshToken,
    logout,
    getMe,
    updateProfile,
} = require("../controller/auth.controller");
const uploadImage = require("../middleware/update-image");
const { verifyToken } = require("../middleware/verify-token");

/**
 * @method POST
 * @route /api/auth/signup
 * @access Public
 */
authRoute.post("/signup", signup);

/**
 * @method POST
 * @route /api/auth/login
 * @access Public
 */
authRoute.post("/login", login);

/**
 * @method POST
 * @route /api/auth/token
 * @access Public
 */
authRoute.post("/token", refreshToken);

/**
 * @method POST
 * @route /api/auth/forgot-password
 * @access Public
 */
authRoute.post("/forgot-password", forgotPassword);

/**
 * @method PUT
 * @route /api/auth/reset-password
 * @access Public
 */
authRoute.put("/reset-password", verifyToken, resetPassword);

/**
 * @method GET
 * @route /api/auth/me/
 * @access Public
 */
authRoute.get("/me", verifyToken, getMe);

/**
 * @method GET
 * @route /api/auth/me/
 * @access Public
 */
authRoute.put("/me", verifyToken, uploadImage("file"), updateProfile);

/**
 * @method GET
 * @route /api/auth/google
 * @access Public
 */

authRoute.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// /**
//  * @method GET
//  * @route /api/auth/google/callback
//  * @access Public
//  */

const LOGIN_SUCCESS_URL = "http://localhost:3000/login/success";

authRoute.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: LOGIN_SUCCESS_URL,
        failureRedirect: "/api/auth/login/failure",
    })
);

// /**
//  * @method GET
//  * @route /api/auth/login/success
//  * @access Public
//  */

authRoute.get("/login/success", (req, res) => {
    console.log("sessionID", req.user);
    res.send("Thank for using my app");
});

// /**
//  * @method GET
//  * @route /api/auth/login/failure
//  * @access Public
//  */

authRoute.get("/login/failure", (req, res) => {
    console.log("not works");
    res.send("fail");
});

// /**
//  * @method POST
//  * @route /api/auth/logout
//  * @access Public
//  */

authRoute.post("/logout", logout);

module.exports = authRoute;
