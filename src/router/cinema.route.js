const express = require("express");
const { addNewCinema, getAllCinemaList, getCinemaDetail } = require("../controller/cinema.controller");
const authorize = require("../middleware/authorize");
const { verifyToken } = require("../middleware/verify-token");
const cinemaRoute = express.Router();

/**
 * @method GET
 * @route /api/cinema
 * @access Private
 */
cinemaRoute.get("/", getAllCinemaList);

/**
 * @method GET
 * @route /api/cinema
 * @access Private
 */
cinemaRoute.get("/:id", getCinemaDetail);

/**
 * @method POST
 * @route /api/cinema
 * @access Private
 */
cinemaRoute.post("/", verifyToken, authorize(["ADMIN"]), addNewCinema);

module.exports = cinemaRoute;
