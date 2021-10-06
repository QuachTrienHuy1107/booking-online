const User = require("../model/user/user.model");
const logger = require("../config/logger");
/**
 * @Desc Get user tickets
 */

const getUserDetail = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Missing id" });
    try {
        const user = await User.findById(id).populate({
            path: "showtimes",
            select: "tickets time",
        });

        res.send(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const me = async (req, res) => {
    // console.log("ss", res.send("oik"));
    res.send({ user: req.user || "123", content: "ok" });
};

module.exports = { getUserDetail, me };
