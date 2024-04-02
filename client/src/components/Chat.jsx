import React, { useState } from 'react';

const Chat = () => {
    // Initial message structure includes type
    const [messages, setMessages] = useState([
        { content: "Hello there!", type: "received" },
        { content: "Hi! How can I help you today?", type: "sent" }
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        // Appending new message as 'sent'
        setMessages([...messages, { content: newMessage, type: "sent" }]);
        setNewMessage('');
    };

    return (
        <div className="p-4">
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
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring"
                    placeholder="Type a message..."
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
