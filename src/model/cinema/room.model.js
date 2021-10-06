const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
    {
        room_name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = { RoomSchema };
