import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectUser } from '../features/auth/authSlice';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Chat = ({ selectedUser }) => {
  // Initial message structure includes type
  const [messages, setMessages] = useState([
    { content: "Hello there!", type: "received" },
    { content: "Hi! How can I help you today?", type: "sent" }
  ]);

  const user = useSelector(selectUser);
  // let {selectedUser} = props;
  // console.log(selectedUser)
  if (!selectedUser) selectedUser = null;
  // Chat.propTypes = {
  //   selectedUser: PropTypes.object.isRequired,
  // };

  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState('');
  const [receiveQueue, setReceiveQueue] = useState([]);
  const [sentQueue, setSentQueue] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // socket.io connection
  useEffect(() => {
    const newSocket = io('http://localhost:3000',
      {
        withCredentials: true,
        extraHeaders: {
        }
      });
    setSocket(newSocket);
    setUserId(user._id);
    // console.log(userId);
    if (selectedUser) setReceiverId(selectedUser._id);
    newSocket.on('receive_message', (data) => {
      setReceiveQueue((prevQueue) => [...prevQueue, data.message]);
    });

    newSocket.emit('set_user_id', userId);

    newSocket.on('typing', (data) => {
      setIsTyping(data.isTyping);
    });

    // return () => {
    //   newSocket.disconnect();
    // };
  }, [user, selectedUser, userId]);


  const handleSendMessage = (e) => {
    e.preventDefault();
    // Emitting the message to the server
    setSentQueue((prevQueue) => [
      ...prevQueue,
      { senderId: userId, receiverId, newMessage },
    ]);
    socket.emit('send_message', { senderId: userId, receiverId, message: newMessage });
    e.target.message.value = '';

    if (!newMessage.trim()) return;
    // Appending new message as 'sent'
    setMessages([...messages, { content: newMessage, type: "sent" }]);
    setNewMessage('');
  };

  const handleTyping = (e) => {
    if (e.key !== 'Enter') socket.emit('typing', { senderId: userId, receiverId, isTyping: true });
  };

  const handleBlur = () => {
    socket.emit('typing', { senderId: userId, receiverId, isTyping: false });
  }

  function startSpeechRecognition() {
    const recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition
    recognition.lang = 'en-US'; // Set language (you can change it as needed)

    // Start speech recognition
    recognition.start();

    // Event listener for when speech is recognized
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript; // Get the recognized speech
      setNewMessage(transcript); // Set the recognized speech as the new message
    };

    // Event listener for errors
    recognition.onerror = function (event) {
      console.error('Speech recognition error:', event.error);
    };
  }

  return (
    <div className="p-4 bg-gray-900 h-full border-white">
      {/*Display the user's name if it exists*/}
      {selectedUser && <h1 className="text-2xl font-bold mb-4 text-white">{selectedUser.name}</h1>}
      <div className="mb-4 h-64 overflow-y-auto bg-white shadow rounded-lg p-4">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 my-2 rounded ${message.type === 'sent' ? 'bg-blue-500 text-white self-end' : 'bg-gray-100'} ml-2`}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          id='message'
          value={newMessage}
          onKeyDown={handleTyping}
          onChange={e => setNewMessage(e.target.value)}
          onBlur={handleBlur}
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring"
          placeholder="Type a message..."
        />
        <span className="flex items-center">
          <button onClick={startSpeechRecognition} className="bg-blue-500 text-white p-2 rounded-l-lg m-2">Speak</button> {/* Style Speak button */}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
            Send
          </button>
        </span>
      </form>
      {isTyping && <div className="text-sm text-gray-500">{selectedUser ? selectedUser.name : "No user selected"} is typing...</div>}
    </div>
  );
};

export default Chat;
