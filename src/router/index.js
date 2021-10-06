const express = require("express");
const authRoute = require("./auth.route");
const cinemaRoute = require("./cinema.route");
const cineplexRoute = require("./cineplex.route");
const movieRoute = require("./movie.route");
const reviewRoute = require("./review.route");
const showtimeRoute = require("./showtime.route");
const userRoute = require("./user.route");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/movie", movieRoute);
router.use("/cinema", cinemaRoute);
router.use("/cineplex", cineplexRoute);
router.use("/showtime", showtimeRoute);
router.use("/review", reviewRoute);
router.use("/user", userRoute);

module.exports = router;
