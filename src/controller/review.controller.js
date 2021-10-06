const Movie = require("../model/movie/movie.model");
const mongoose = require("mongoose");
const Paginate = require("../shared/helper/pagination");
const Review = require("../model/review/review.model");

/**
 * @Desc Create a new local account.
 */
const addNewReview = async (req, res) => {
    const { content, movieId, rating } = req.body;
    const userId = req.user?.userId;
    if (!movieId || !content) return res.status(404).json({ success: false, message: "Missing data" });
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(401).json({ success: false, message: "Movie not found" });

        //Create new review for a movie

        const newReview = new Review({ movie: movieId, user: userId, content, rating });
        const review = await newReview.save().then((t) => t.populate("user", "username email avatar").execPopulate());
        res.status(200).send(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getReviewByMovie = async (req, res) => {
    const { id } = req.params;
    const { page, size } = req.query;
    if (!page || !size) return res.status(404).json({ message: "Missing current page or limit size" });
    const { skip, limit } = Paginate(page, size);
    try {
        const reviewList = await Review.find({ movie: id })
            .populate("user", "username email avatar -_id")
            .populate("movie", "title -_id")
            .skip(skip)
            .limit(limit)
            .sort({
                createdAt: -1,
            });

        const total = await Review.find({ movie: id });

        res.status(200).send({ reviewList, total: total.length });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getReviewByUser = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const reviews = await Review.find({ user: userId }).populate("movie", "title -_id").sort({
            createdAt: -1,
        });
        return res.status(200).send(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { addNewReview, getReviewByMovie, getReviewByUser };
