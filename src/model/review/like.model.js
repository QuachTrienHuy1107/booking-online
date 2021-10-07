const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    {
        timestamps: true,
    }
);
const Like = mongoose.model("likes", LikeSchema);
module.exports = { Like, LikeSchema };
