const authorize = (arrRole) => (req, res, next) => {
    const { user } = req;
    if (arrRole.findIndex((role) => user.role === role) !== -1) {
        next();
    } else {
        res.status(403).send("You are not authorized to access!!");
    }
};

module.exports = authorize;
