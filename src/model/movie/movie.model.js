const mongoose = require("mongoose");
const Joi = require("joi");
const { IMDBSchema } = require("./imdb.model");

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
    {
        plot: {
            type: String,
        },
        fullplot: {
            type: String,
        },
        genres: [
            {
                type: String,
                enum: ["Drama", "Comedy", "Short", "Romance", "Western", "Adventure", "Family", "Thriller", "Sport"],
                default: "Drama",
            },
        ],
        cast: [
            {
                type: String,
            },
        ],
        title: {
            type: String,
            maxLength: 255,
            required: true,
            unique: true,
        },

        released: {
            type: Date,
        },
        rating: {
            type: Number,
            default: 10,
            min: 1,
            max: 10,
        },
        languages: [String],
        poster: {
            type: String,
        },
        imdb: {
            type: IMDBSchema,
        },
        countries: [
            {
                type: String,
            },
        ],
        type: String,
        movieRecommend: [
            {
                type: Schema.Types.ObjectId,
                ref: "movie",
            },
        ],

        cinema: [
            {
                type: Schema.Types.ObjectId,
                ref: "cinema",
            },
        ],

        trailer: {
            type: String,
        },
    },
    { timestamps: true }
);

const Movie = mongoose.model("movie", MovieSchema);

const validateSchema = (user) => {
    const schema = Joi.object({
        movie_name: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = Movie;
