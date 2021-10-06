const express = require("express");
const { addNewReview, getReviewByMovie, getReviewByUser } = require("../controller/review.controller");
const { verifyToken } = require("../middleware/verify-token");
const reviewRoute = express.Router();

/**
 * @method POST
 * @route /api/review
 * @access Public
 */
reviewRoute.post("/", verifyToken, addNewReview);

/**
 * @method GET
 * @route /api/review
 * @access Public
 */
reviewRoute.get("/:id", getReviewByMovie);

/**
 * @method GET
 * @route /api/review
 * @access Public
 */
reviewRoute.get("/", verifyToken, getReviewByUser);

module.exports = reviewRoute;
