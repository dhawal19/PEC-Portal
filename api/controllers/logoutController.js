const User = require('../models/userModel');

// async function to handle logout
const handleLogout = async (req, res) => {
    
    const cookie = req.cookies;
    const refreshToken = cookie.jwt;
    console.log({...cookie});
    if(!cookie?.jwt){
        return res.status(401).json({error: "Unauthorized"});
    }
    const foundUser = await User.findOne({refreshToken});
    if(!foundUser){
        return res.status(401).json({error: "user not found"});
    }

    foundUser.refreshToken = "";
    await foundUser.save();
    res.clearCookie('jwt', {path: '/', sameSite: 'none', httpOnly: true, secure: true});
    res.status(200).json({message: "Logged out successfully"});
   
}

module.exports = handleLogout;