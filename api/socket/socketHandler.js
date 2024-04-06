const {storeMessage} = require('../controllers/messageController');
const currentUsers = [];
const socketHandler = (io) => {
    io.on('connection', (socket)=> {
        console.log('user connected: ', socket.id);
    
        socket.on('set_user_id', (userId)=>{
            currentUsers[userId] = socket.id;
            console.log(currentUsers);
        })
    
        socket.on('disconnect', ()=>{
            console.log('user disconnected: ', socket.id);
            Object.keys(currentUsers).forEach(key => {
                if(currentUsers[key] === socket.id){
                    delete currentUsers[key];
                }
            });
        });
    
        socket.on('send_message', async ({senderId, receiverId, message})=>{
            try {
                console.log('message: ', message);
                console.log('receiverId: ', receiverId);
                console.log('senderId: ', senderId);
                console.log('currentUsers: ', currentUsers);
                if(currentUsers[receiverId]){
                    console.log('receiver is online');
                    socket.broadcast.to(currentUsers[receiverId]).emit('receive_message', {senderId, message});
                    console.log('message sent');

                    const messageData = {senderId, receiverId, message};
                    await storeMessage(messageData);
                }
                else{
                    console.log('receiver is offline');
                    // implement retry logic
                }
            }
            catch(error){
                console.log("Error in send_message event", error.message);
                
            }
        })
    
        socket.on('typing', ({senderId, receiverId, isTyping})=>{
            if(currentUsers[receiverId]){
                socket.broadcast.to(currentUsers[receiverId]).emit('typing', {senderId, isTyping});
            }
        })
    }
    )
}
module.exports = socketHandler;