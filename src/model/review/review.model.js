const mongoose = require("mongoose");
const { LikeSchema } = require("./like.model");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        movie: {
            type: Schema.Types.ObjectId,
            ref: "movie",
        },
        user: { type: Schema.Types.ObjectId, ref: "user" },
        rating: {
            type: Number,
            default: 100,
            max: 100,
            min: 10,
        },
        likes: {
            type: [LikeSchema],
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;
