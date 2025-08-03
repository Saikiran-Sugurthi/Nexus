const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
    // The payload now includes both the user's ID and their role.
    // This allows your middleware to verify the role without another database query.
    const payload = {
        id,
        role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d", // The token will be valid for 30 days.
    });
};

module.exports = generateToken;
