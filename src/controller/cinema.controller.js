const Cinema = require("../model/cinema/cinema.model");
const Movie = require("../model/movie/movie.model");

/**
 * @Desc Create a new local account.
 */
const addNewCinema = async (req, res) => {
    const { cineplex_id, cinema_name, address, logo, ...test } = req.body;
    if (!cinema_name) {
        return res.status(404).json({ message: "Missing cinema name" });
    }

    try {
        const cinema = await Cinema.findOne({ cinema_name });
        if (cinema) return res.status(404).json({ message: "Cinema has already" });

        // let check = -1;
        // let newArr = [];
        // for (let i = 0; i < cinema.movies.length; i++) {
        //     if (cinema.movies[i].movieId.equals(movie_id)) {
        //         check = i;
        //         return res.status(404).json({ message: "Movie belongs to this cinema" });
        //     }
        // }
        // //Not found movie in cinema
        // if (check === -1) {
        //     newArr = cinema.movies.push(movieId);
        // }

        const newCinema = new Cinema({
            cinema_name,
            address,
            logo,
            cineplex: cineplex_id,
        });
        const result = await newCinema.save();

        return res.status(200).json({ message: "Create successfully", result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * @Desc Get all cinema list.
 */
const getAllCinemaList = async (req, res) => {
    try {
        // const cinema = await Cinema.find().populate("showtimes", "-tickets -_id");
        const cinema = await Cinema.find()
            .populate({
                path: "showtimes",
                populate: { path: "movie", model: Movie, select: "-_id" },
            })
            .populate("movies", "-_id");
        res.send(cinema);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * @Desc Get cinema detail.
 */
const getCinemaDetail = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ message: "Missing id" });
    }
    try {
        const cinema = await Cinema.findOne({ _id: id }).populate("cineplex", "cineplex_name -_id");
        if (!cinema) return res.status(404).json({ message: "Cinema doen not exist" });
        res.status(200).json(cinema);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { addNewCinema, getAllCinemaList, getCinemaDetail };
