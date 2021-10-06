const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Token } = require("../model/user/token.model");
const User = require("../model/user/user.model");
const { sendMail } = require("../shared/mail");
const cloudinary = require("cloudinary").v2;
const logger = require("../config/logger");

/**
 * @Desc Get user detail
 */

/**
 * @Desc Create a new  account.
 */
const signup = async (req, res) => {
    const { username, password, email, confirmPassword } = req.body;
    if (confirmPassword !== password) return res.status(404).send("The two passwords that you entered do not match!");
    const salt = bcrypt.genSaltSync(10);
    if (!username || !password || !email) {
        return res.status(404).json({
            success: false,
            message: "Missing username and/or password",
        });
    }

    try {
        const user = await User.findOne({ username });
        const checkEmail = await User.findOne({ email });
        if (user) {
            return res.status(404).json({ success: false, message: "Username is already!" });
        }
        if (checkEmail) {
            return res.status(404).json({ success: false, message: "Email is already!" });
        }
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({ username, password: hashPassword, email });
        await newUser.save();

        res.status(200).json({
            email,
            password,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @Desc Sign in using email and password.
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({
            success: false,
            message: "Missing email and/or password",
        });
    }

    try {
        // Check user in db
        const userLogin = await User.findOne({ $or: [{ email }, { password }] });

        if (!userLogin) return res.status(404).json({ success: false, message: "User doesn't exist" });

        // Verify password
        const isPasswordCorrect = bcrypt.compareSync(password, userLogin.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ success: false, message: "Incorrect password" });
        }
        //Allgood
        const accessToken = jwt.sign({ userId: userLogin._id, role: userLogin.role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: +process.env.EXPIRED_TOKEN,
        });
        const refreshToken = jwt.sign(
            { userId: userLogin._id, role: userLogin.role },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: +process.env.EXPIRED_RF_TOKEN,
            }
        );
        userLogin.token = new Token({ userId: userLogin._id, token: refreshToken });
        await userLogin.save();

        const userRes = await User.findById(userLogin._id)
            .select({ token: 0, password: 0 })
            .populate({
                path: "showtimes",
                select: "tickets time",
                populate: [
                    { path: "cinema", select: "cinema_name -_id " },
                    { path: "movie", select: "title -_id" },
                ],
            });

        res.status(200).send({
            user: userRes,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @Desc Refresh token
 */
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.state(401).send("Token is invalid");
        const userId = await verifyRefreshToken(refreshToken);
        const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.EXPIRED_TOKEN,
        });
        const refrToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.EXPIRED_RF_TOKEN,
        });
        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: {
                accessToken,
                refrToken,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * @Desc Forgot password
 */
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(404).json({ success: false, message: "Email is required!!" });
    try {
        //Find user's email in db
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: "This email is not registed" });
        //if email exist

        //Generate token for authorizing user is valid
        const token = jwt.sign({ userId: user._id, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
        const html = `
        <h2>Please click the link to reset your password</h2>
        <p>http://localhost:3000/reset-password/${token}</p>
    `;

        const { error } = await sendMail(email, html);
        if (error) {
            console.log(error);
            return res.status(404).json({ success: false, message: "Sending email failed" });
        }

        res.status(200).json({ success: true, message: "Email has been sent! Please check your email" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const resetPassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) return res.status(404).send("The two password is not match");
    const userId = req.user?.userId;

    if (!newPassword) {
        return res.status(404).json({ success: false, message: "Missing password" });
    }
    const salt = bcrypt.genSaltSync(10);
    try {
        const user = await User.findById(userId);
        console.log("user", user);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        //Verify token
        // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // if (decoded.userId !== id) {
        //     return res.status(404).json({ success: false, message: "Invalid password or expired reset token" });
        // }
        // All good
        const hashPassword = await bcrypt.hashSync(newPassword, salt);
        const result = await User.updateOne({ _id: userId }, { $set: { password: hashPassword } }, { new: true });

        if (result.ok === 1) {
            return res.status(200).json({ success: true, message: "Change password successfully" });
        } else {
            return res.status(404).json({ success: false, message: "Change password failed! Try again" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getMe = async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) return res.status(404).json({ message: "Missing token" });
    try {
        const user = await User.findById(userId)
            .select({ token: 0, password: 0 })
            .populate({
                path: "showtimes",
                select: "tickets time",
                populate: [
                    { path: "cinema", select: "cinema_name -_id " },
                    { path: "movie", select: "title -_id" },
                ],
            });

        // const user = await User.aggregate([
        //     {
        //         $match: { _id: mongoose.Types.ObjectId(userId) },
        //     },
        //     {
        //         $lookup: { from: "showtimes", localField: "showtimes", foreignField: "_id", as: "showtimes_docs" },
        //     },
        // ]);

        res.send(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { file } = req; //Get the file to request to server

        const { username, email, phone, newPassword, oldPassword } = req.body;
        let imgUrl = null;
        let hashPassword = null;

        const userId = req.user?.userId;

        if (!username || !email) {
            return res.status(404).json({
                success: false,
                message: "Missing username and/or email",
            });
        }
        const userFound = await User.findById(userId);
        if (!userFound) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Verify password
        if (!!oldPassword && !!newPassword) {
            const isPasswordCorrect = bcrypt.compareSync(oldPassword, userFound.password);
            if (!isPasswordCorrect) {
                return res.status(403).json({ success: false, message: "Incorrect password" });
            }

            //Setup
            const salt = bcrypt.genSaltSync(10);
            hashPassword = bcrypt.hashSync(newPassword, salt);
        }

        if (!!file) {
            console.log("updated");
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
            });

            const uploadResponse = await cloudinary.uploader.upload(file.path, {
                upload_preset: "dev_setups",
            });
            imgUrl = uploadResponse.url;
        }

        const data = {
            ...userFound._doc,
            username,
            email,
            password: hashPassword || userFound.password,
            phone: phone || null,
            updatedAt: Date.now(),
            avatar:
                imgUrl ||
                userFound.avatar ||
                "https://ddxcu89oqzgqh.cloudfront.net/uploads/account/avatar/5c92181f98f4500bb0003fbc/44884218_345707102882519_2446069589734326272_n.jpg",
        };

        const user = await User.findOneAndUpdate({ _id: userId }, data, { new: true })
            .select({ token: 0, password: 0 })
            .populate({
                path: "showtimes",
                select: "tickets time",
                populate: [
                    { path: "cinema", select: "cinema_name -_id " },
                    { path: "movie", select: "title -_id" },
                ],
            });
        if (!!user) return res.status(200).json({ user, isSuccess: true });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const logout = (req, res) => {
    res.send("logou");
};

module.exports = { signup, login, refreshToken, forgotPassword, resetPassword, logout, getMe, updateProfile };
