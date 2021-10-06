const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CineplexSchema = new Schema(
    {
        cineplex_name: {
            type: String,
            required: true,
            maxLength: 255,
        },
        logo: {
            type: String,
            // required: true,
        },
    },
    { timestamps: true }
);

const Cineplex = mongoose.model("cineplex", CineplexSchema);

module.exports = Cineplex;
