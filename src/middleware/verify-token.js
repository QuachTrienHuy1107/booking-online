const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.trim().split(" ")[1];

    if (!token) {
        return res.status(403).json({ success: false, message: "Missing token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        //Assigning req.userId after verify token
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error.message);
        if (error.message === "jwt expired") {
            return res.status(401).json({ success: false, message: "Token is expired" });
        }
        return res.status(500).json({ success: false, message: "Invalid token" });
    }
};

module.exports = { verifyToken };
