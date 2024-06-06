import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState("");
A🫀
    useEffect(() => {
        fetchRecentConversations();
    }, []);

    const fetchRecentConversations = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`http://localhost:3018/api/chat/recent-conversations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setConversations(response.data);
        } catch (error) {
            console.error("Error fetching conversations", error);
        }
    };

    const fetchMessages = async (recipient) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`http://localhost:3018/api/chat/messages/${recipient}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessages(response.data);
            setSelectedUser(recipient);
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };

    const sendMessage = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.post(`http://localhost:3018/api/chat/messages`, {
                recipient: selectedUser,
                message: message
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage("");
            fetchMessages(selectedUser);
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    return (
        <div className="chat-container">
            <div className="conversations-list">
                {conversations.map(user => (
                    <div key={user.id} onClick={() => fetchMessages(user.username)}>
                        <span>{user.username}</span>
                    </div>
                ))}
            </div>
            <div className="messages-container">
                {selectedUser && (
                    <>
                        <div className="messages">
                            {messages.map(msg => (
                                <div key={msg.id} className={msg.author === selectedUser ? 'received' : 'sent'}>
                                    <p>{msg.message}</p>
                                    <span>{msg.time}</span>
                                </div>
                            ))}
                        </div>
                        <div className="message-input">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message"
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
