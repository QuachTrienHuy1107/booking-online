const express = require("express");
const { addNewCinePlex, getCineplexDetail } = require("../controller/cineplex.controller");
const authorize = require("../middleware/authorize");
const { verifyToken } = require("../middleware/verify-token");
const cineplexRoute = express.Router();

/**
 * @method POST
 * @route /api/cineplex
 * @access Private
 */
cineplexRoute.post("/", verifyToken, authorize(["ADMIN"]), addNewCinePlex);

/**
 * @method GET
 * @route /api/cineplex
 * @access Private
 */
cineplexRoute.get("/:id", getCineplexDetail);

module.exports = cineplexRoute;
