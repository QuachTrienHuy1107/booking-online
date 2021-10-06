const express = require("express");
const { createNewShowTime, findAllShowtime, booking, getStatistic, getShowtimeDetail } = require("../controller/showtime.controller");
const uploadImage = require("../middleware/update-image");
const { verifyToken } = require("../middleware/verify-token");
const showtimeRoute = express.Router();

/**
 * @method GET
 * @route /api/movie
 * @access Private
 */
showtimeRoute.get("/", findAllShowtime);

/**
 * @method POST
 * @route /api/showtime
 * @access Private
 */
showtimeRoute.post("/", createNewShowTime);

/**
 * @method GET
 * @route /api/showtime/statistics
 * @access Private
 */
showtimeRoute.get("/statistics", getStatistic);

/**
 * @method GET
 * @route /api/showtime/:id
 * @access Private
 */
showtimeRoute.get("/:id", getShowtimeDetail);

module.exports = showtimeRoute;
