require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./src/config/db");
const router = require("./src/router");
const passport = require("passport");
const configPassport = require("./src/config/passport");
const session = require("express-session");

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json()); // for parsing application/json

//Using static folder image
app.use("/images", express.static(path.join(__dirname, "\\../public/images")));

//Sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
        maxAge: 1000 * 60 * 15,
    })
);

//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());
configPassport(passport);

//router
app.use("/api", router);

//connectDB
connectDB();
console.log("__dirname", __dirname);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is starting at ${PORT}`);
});
