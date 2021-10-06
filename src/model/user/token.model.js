const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        token: {
            type: String,
            default: Date.now(),
        },
        expiredTime: {
            type: Number,
            default: +process.env.EXPIRED_RF_TOKEN,
        },
    },
    { timestamps: true }
);

const Token = mongoose.model("token", TokenSchema);

module.exports = { TokenSchema, Token };
