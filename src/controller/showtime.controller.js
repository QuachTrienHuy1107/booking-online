const Cinema = require("../model/cinema/cinema.model");
const Movie = require("../model/movie/movie.model");
const { Showtime } = require("../model/showtime/showtime.model");
const { Ticket } = require("../model/ticket/ticket.model");
const Mongoose = require("mongoose");
const User = require("../model/user/user.model");

// const Schema = mongoose.Schema;
/**
 * @Desc get all movie
 */
const createNewShowTime = async (req, res) => {
    const { movieId, cinemaId, time } = req.body;
    try {
        const findTime = await Showtime.findOne({ $and: [{ time }, { cinema: cinemaId }] });
        if (findTime) return res.status(404).json({ message: "Time is already" });
        const newShowtime = new Showtime({
            movie: movieId,
            cinema: cinemaId,
            time,
        });

        for (let i = 0; i < 160; i++) {
            const newTicket = new Ticket({
                seat_number: `${i}`,
                type: (i > 68 && i < 75) || (i > 84 && i < 91) || (i > 100 && i < 107) ? "Vip" : "Normal",
                price: (i > 68 && i < 75) || (i > 84 && i < 91) || (i > 100 && i < 107) ? 90000 : 75000,
            });
            await newShowtime.tickets.push(newTicket);
        }
        //Add showtime and movie to cinema

        const showtime = await newShowtime.save();

        const cinema = await Cinema.findOneAndUpdate(
            { _id: cinemaId },
            { $addToSet: { showtimes: showtime._id, movies: movieId } },
            { new: true }
        );

        await Movie.findOneAndUpdate({ _id: movieId }, { $addToSet: { cinema: cinema._id } }, { new: true });
        return res.status(200).json({ success: true, message: "Create successfully", showtime });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const findAllShowtime = async (req, res) => {
    try {
        const showtime = await Showtime.find().populate("movie cinema tickets.user  ", "-_id");
        if (!showtime) return res.status(404).send("Showtime not found");

        res.status(200).json({ message: "All showtime", showtime });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc get paginate movie
 */
const getShowtimeDetail = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Missing id" });
    try {
        const showtime = await Showtime.findById(id, { __v: 0 })
            .populate("movie", "-cinema")
            .populate("cinema", "-movies -showtimes");
        if (!showtime) return res.status(404).json({ message: "Movie not found" });

        return res.status(200).send(showtime);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getStatistic = async (req, res) => {
    try {
        const showtimes = await Showtime.aggregate([
            {
                $unwind: "$tickets",
            },

            {
                $match: {
                    "tickets.status": true,
                },
            },
            {
                $group: {
                    _id: "$_id",
                    tickets: { $addToSet: "$tickets" },
                },
            },
        ]);

        res.status(200).json({ showtimes });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { createNewShowTime, findAllShowtime, getStatistic, getShowtimeDetail };
