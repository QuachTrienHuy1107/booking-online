const Cineplex = require("../model/cinema/cineplex.model");

/**
 * @Desc Create a new local account.
 */
const addNewCinePlex = (req, res) => {
    const { cineplex_name } = req.body;
    try {
        const newCineplex = new Cineplex({
            cineplex_name,
        });
        newCineplex.save();
        return res.status(200).json({ message: "Create successfully", newCineplex });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * @Desc Get cineplex detail
 */

const getCineplexDetail = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ message: "Missing id" });
    }
    try {
        const cineplex = await Cineplex.findOne({ _id: id });
        if (!cineplex) return res.status(404).json({ message: "Cineplex doen not exist" });
        res.status(200).json(cineplex);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { addNewCinePlex, getCineplexDetail };
