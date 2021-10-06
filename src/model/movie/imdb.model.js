const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IMDBSchema = new Schema(
    {
        content: {
            type: String,
        },
        movie: {
            type: Schema.Types.ObjectId,
            ref: "movie",
        },
        user: { type: Schema.Types.ObjectId, ref: "user" },
    },
    { timestamps: true }
);

const IMDB = mongoose.model("imdb", IMDBSchema);

module.exports = { IMDBSchema, IMDB };
