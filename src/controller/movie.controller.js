const Movie = require("../model/movie/movie.model");
const User = require("../model/user/user.model");
const { Showtime } = require("../model/showtime/showtime.model");
const cloudinary = require("cloudinary").v2;
const Paginate = require("../shared/helper/pagination");
/**
 * @Desc get all movie
 */
const getAllMovie = async (req, res) => {
    try {
        const movielist = await Movie.find();
        return res.status(200).json({ success: true, movielist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc get paginate movie
 */
const getPaginateMovie = async (req, res) => {
    const { page, size, q } = req.query;
    if (!page || !size) return res.status(404).json({ message: "Missing current page or limit size" });
    const { skip, limit } = Paginate(page, size);
    try {
        const regex = new RegExp(q);
        const movies = await Movie.aggregate([
            {
                $match: { title: !!q ? regex : / / },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ]);
        const total = await Movie.find();
        return res.status(200).json({ movies, total: total.length });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc Search movie
 */

const searchMovie = async (req, res) => {
    const { q } = req.query;
    try {
        const regex = new RegExp(q);
        const movies = await Movie.find({ title: !!q ? regex : / / })
            .select("title")
            .limit(10);
        return res.status(200).send(movies);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc get languages
 */

const getLanguages = async (req, res) => {
    try {
        const languages = await Movie.distinct("languages");
        res.status(200).send(languages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc get genres
 */

const getGenres = async (req, res) => {
    try {
        const genres = await Movie.distinct("genres");
        res.status(200).send(genres);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc get movie filter
 */

const getMovieByLanguages = async (req, res) => {
    if (!req.query) return;
    const { filter } = req.query;
    console.log("filter", filter);

    if (!filter) return res.status(404).json({ success: false, message: "Missing filter" });
    const listFilter = filter.split("|");

    try {
        const movies = await Movie.find({ genres: { $in: listFilter } }).limit(20);
        res.status(200).json({ movies, total: movies.length });
        // const movies = await Movie.aggregate([
        //     {
        //         $project: {
        //             attribute3: { $setUnion: ["$languages", "$gr"] },
        //         },
        //     },
        // ]);
        // res.send(movies);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc get paginate movie
 */
const getMovieDetail = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Missing id" });
    try {
        const _movie = await Movie.findById(id, { __v: 0 }).populate({
            path: "cinema",
            populate: { path: "showtimes", model: Showtime },
        });
        if (!_movie) return res.status(404).json({ message: "Movie not found" });

        // const updateMovieRecommend = await Movie.find({ genres: { $in: _movie.genres } })
        // .limit(5);
        // const movie = await Movie.findOneAndUpdate(
        //     { _id: id },
        //     { $addToSet: { movieRecommend: updateMovieRecommend } },
        //     { new: true }
        // ).populate("movieRecommend", "-movieRecommend");

        return res.status(200).send(_movie);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc Add new movie
 */

const booking = async (req, res) => {
    const { showtimeId, arrayTickets } = req.body;
    const userId = req.user?.userId;
    try {
        //tickets is array include ticketId, userId
        const showtime = await Showtime.findById(showtimeId);
        if (!showtime) return res.status(404).json({ message: "Showtime does not exist" });
        let check = -1;
        arrayTickets.forEach((ticket) => {
            const { _id } = ticket;
            for (let i = 0; i < showtime.tickets.length; i++) {
                if (showtime.tickets[i]._id.equals(_id)) {
                    check = i;
                    showtime.tickets[i].user = userId;
                    showtime.tickets[i].status = true;
                }
            }
        });
        await showtime.save();

        await User.findOneAndUpdate({ _id: userId }, { $addToSet: { showtimes: showtimeId } }, { new: true });

        return res.status(200).json({ success: true, message: "Create booking successfully", showtime });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc Add new movie
 */
const addMovie = async (req, res) => {
    // const { file } = req;
    // const { movie_name, description, start_date, time } = req.body;

    // const urlImage = `${Date.now()}_${file?.originalname}`;

    // console.log("file", file.path);

    // cloudinary.config({
    //     cloud_name: process.env.CLOUDINARY_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
    // });

    try {
        // const movie = await Movie.findOne({ movie_name });
        // if (movie) return res.status(404).json("Movie is already!");

        // const uploadResponse = await cloudinary.uploader.upload(file.path, {
        //     upload_preset: "dev_setups",
        // });

        // console.log("uploadResponse", uploadResponse);

        const data = new Movie(req.body);

        await data.save();
        res.json({
            success: true,
            message: "Post created successfully",
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const editMovie = async (req, res) => {
    const { id } = req.params;
    const { movie_name, description, start_date, time, rating, showtime } = req.body;
    if (!movie_name) {
        return res.status(404).json({ success: false, message: "Movie name is not empty!!" });
    }

    try {
        const movie = await Movie.findOne({ movie_name });
        if (movie) return res.status(400).json("Movie is already!");

        const data = {
            ...req.body,
            movie_name,
        };

        const updateCondition = { _id: id };
        const result = await Movie.findOneAndUpdate(updateCondition, data, { new: true });
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Movie not found or user not authorised",
            });
        }
        res.status(200).json({ success: true, message: "Edit successfully!", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * @Desc remove movie
 */
const deleteMovie = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Missing id" });
    try {
        const deleteCondition = { _id: id };
        const result = await Movie.findOneAndDelete(deleteCondition);
        console.log("result", result);
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Movie not found or user not authorised",
            });
        }
        res.status(200).json({ success: true, message: "Remove successfully!", result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    getAllMovie,
    getMovieDetail,
    getPaginateMovie,
    addMovie,
    editMovie,
    deleteMovie,
    getMovieByLanguages,
    getLanguages,
    getGenres,
    booking,
    searchMovie,
};
