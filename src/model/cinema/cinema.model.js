const mongoose = require("mongoose");
const { RoomSchema } = require("./room.model");

const Schema = mongoose.Schema;

const CinemaSchema = new Schema(
    {
        cinema_name: {
            type: String,
            required: true,
            maxLength: 255,
        },
        address: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        cineplex: {
            type: Schema.Types.ObjectId,
            ref: "cineplex",
        },
        showtimes: [
            {
                type: Schema.Types.ObjectId,
                ref: "showtime",
            },
        ],
        movies: [
            {
                type: Schema.Types.ObjectId,
                ref: "movie",
            },
        ],
        room: [RoomSchema],
    },
    { timestamps: true }
);

const Cinema = mongoose.model("cinema", CinemaSchema);

module.exports = Cinema;
