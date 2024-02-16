const User = require('../models/userModel');

// async function to handle logout
const handleLogout = async (req, res) => {
    try{
        const refreshToken = req.cookies.jwt;
        if(!refreshToken) return res.status(401).json({error: "User not logged in"});

        const foundUser = await User.findOne({refreshToken});
        if(!foundUser) return res.status(401).json({error: "User not found"});

        foundUser.refreshToken = undefined;
        await foundUser.save();

        res.clearCookie('jwt');
        res.status(200).json({message: "User logged out successfully"});
    }
    catch{
        res.status(500).json({error: "Server error"});
    }
}

module.exports = handleLogout;