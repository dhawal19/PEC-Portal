// const User = require('../models/userModel');
const { request } = require('http');
const connectionRequest = require('../models/connectionRequestModel');
const User = require("../models/userModel")

const sendRequest = async (req, res) => {
    try {
        const { SID } = req.body;
        const userEmail = req.email;
        // console.log(userEmail);
        const sender = await User.findOne({ email: userEmail });
        const receiver = await User.findOne({ SID: SID });

        if (!sender) return res.status(404).json({ message: "Sender not found" })
        if (!receiver) return res.status(404).json({ message: "Receiver not found" })

        if (sender.SID == SID) return res.status(403).json({ message: "User cannot send request to self" })

        // else create a new course
        const request = new connectionRequest({
            sentBy: sender,
            receivedBy: receiver
        })
        await request.save();
        res.status(200).json({ message: 'Request added successfully' });
    }
    catch (error) {
        console.log("error in send connection request controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const acceptRequest = async (req, res) => {
    try {
        const { SID } = req.body;
        const userEmail = req.email;

        const sender = await User.findOne({ SID: SID });
        // console.log(sender.name);
        const receiver = await User.findOne({ email: userEmail });
        if (receiver.SID == SID) return res.status(403).json({ message: "Cannot accept a request you sent" })
        // console.log(receiver.name);
        const request = await connectionRequest.findOne({ sentBy: sender, receivedBy: receiver });
        // console.log(request);
        if (!request) return res.status(404).json({ message: 'Request not found' });
        if (!sender) return res.status(404).json({ message: "Sender not found" })
        if (!receiver) return res.status(404).json({ message: "Receiver not found" })

        sender.connections.push(receiver)
        receiver.connections.push(sender)
        await sender.save();
        await receiver.save();

        // delete request from db
        await connectionRequest.findOneAndDelete({ sentBy: sender, receivedBy: receiver });
        res.status(200).json({ message: 'Request accepted successfully' });
    }
    catch (error) {
        console.log("error in accept connection request controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getUsers = async (req, res) => {
    try {
        const userEmail = req.email;
        const user = await User.findOne({ email: userEmail });

        // Find users who are not in the connected users list of the logged-in user
        const usersNotConnected = await User.find({
            email: { $ne: userEmail }, // Exclude the logged-in user
            _id: { $nin: user.connections } // Exclude users who are already connected
        });

        res.status(200).json(usersNotConnected);
    } catch (error) {
        console.error("Error in getUsers controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getPendingRequests = async (req, res) => {
    try {
        const userEmail = req.email;
        const user = await User.find({ email: userEmail });
        // Find all connection requests where receivedBy matches the logged-in user's ID
        const pendingRequests = await connectionRequest.find({ receivedBy: user });

        const requests = await Promise.all(pendingRequests.map(async request => {
            try {
                const sentByUser = await User.findById(request.sentBy);
                if (!sentByUser) {
                    throw new Error(`User with ID ${request.sentBy} not found`);
                }
                return {
                    name: sentByUser.name,
                    SID: sentByUser.SID,
                    branch: sentByUser.branch,
                    societies: sentByUser.societies
                };
            } catch (error) {
                console.error('Error fetching user information:', error);
                throw new Error('Failed to fetch user information');
            }
        }));
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching pending connection requests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { sendRequest, acceptRequest, getUsers, getPendingRequests };