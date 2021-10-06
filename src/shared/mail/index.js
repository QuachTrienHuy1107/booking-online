const nodemailer = require("nodemailer");

async function sendMail(email, html) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL, // generated ethereal user
            pass: process.env.PASSWORD_EMAIL, // generated ethereal password
        },
        maxConnections: 5,
        maxMessages: 10,
    });

    const data = {
        form: "MERN-BOOKING-ONLINE",
        to: email,
        subject: "Reset password",
        html,
    };
    const { error, info } = await transporter.sendMail(data);

    return { error, info };
}

module.exports = { sendMail };
