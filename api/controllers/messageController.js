const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

const storeMessage = async (messageData) => {
    // req.params.id bcz in message route we take id
    // console.log("message sent", req.params.id);
    try {
        const { senderId, receiverId, message } = messageData;
        // bcz we have added user id in our request in middleware(protected route)
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        };
        // await conversation.save();
        // await newMessage.save();

        // The above two lines can be replaced with this as this will run in parallel;
        await Promise.all([conversation.save(), newMessage.save()]);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
    }
};

const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // find conversation
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");
        // populates fetches all the messages
        if (!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
   getMessage,storeMessage
};