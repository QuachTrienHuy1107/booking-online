const express = require("express");
const authRoute = express.Router();
const {
    signup,
    login,
    forgotPassword,
    resetPassword,
    refreshToken,
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

module.exports = authRoute;
