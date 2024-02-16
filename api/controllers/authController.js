require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const handleLogin = async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json(error = "Please enter all the details correctly");
    }

    const foundUser = await User.findOne({email});

    if(!foundUser){
        return res.status(400).json(error = "User not found");
    }

    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if(!correctPassword) return res.status(401).json(error = "Wrong password!");
    else{
        const accessToken = jwt.sign(
            {email: email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m', algorithm: 'HS256'}
        );

        const refreshToken = jwt.sign(
            {email: foundUser.email}, 
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        res.cookie('jwt', refreshToken, {maxAge: 24*60*60*1000,httpOnly: true, secure: true, sameSite: 'none'});
        foundUser.password = undefined;
        foundUser.refreshToken = undefined;
        res.json({foundUser, accessToken});
    }
}

const handleRegister = async(req, res) =>{
    const {name, email, password, SID, bio, branch} = req.body;
    if(!name || !email || !password || !SID || !bio || !branch){
        res.status(400).json(error = "Please enter all the details correctly");
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        email,
        password: hashedPassword, 
        SID,
        bio,
        branch
    });

    try{
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(409).json(error = "User already exists");
    }
}

module.exports = {handleLogin, handleRegister};