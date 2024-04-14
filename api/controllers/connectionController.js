// const User = require('../models/userModel');
const connectionRequest = require('../models/connectionRequestModel');
const User = require("../models/userModel")

const sendRequest = async (req, res) => {
    try {
        const { SID } = req.body;
        const userEmail = req.email;
        // console.log(userEmail);
        const sender = await User.findOne({ email: userEmail });
        const receiver = await User.findOne({ SID: SID });

        if (sender.SID == SID) return res.status(403).json({ message: "User cannot send request to self" })

        if (!sender) return res.status(404).json({ message: "Sender not found" })
        if (!receiver) return res.status(404).json({ message: "Receiver not found" })

        // else create a new course
        request = new connectionRequest({
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

module.exports = { sendRequest, acceptRequest };