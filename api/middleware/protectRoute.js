const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorised - No token provided" });
        }
        // if token then decode it
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorised - Invalid token" });
        }
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        // call the next function i.e. the send message
        next();
    } catch (error) {
        console.log("Error in protectRoute: " + error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { protectRoute };