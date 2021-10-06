function resetPasswordTemplate(resetLink) {
    return {
        subject: "Your password reset request",
        html: `
            <h2>Please click the link to reset your password</h2>
            <p>${resetLink}</p>
        `,
    };
}
module.exports = { resetPasswordTemplate };
