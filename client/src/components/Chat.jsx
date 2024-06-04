import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Chat({ socket }) {
  const { username: recipient } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState("");
  const [inputRecipient, setInputRecipient] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          console.log("Token payload:", payload);
          if (payload.user && payload.user.id) {
            const response = await axios.get(`http://localhost:3018/api/user/get/${payload.user.id}`);
            const userUsername = response.data.username;
            if (userUsername) {
              setUsername(userUsername);
              console.log("Username set to:", userUsername);
              socket.emit("join", userUsername);
            } else {
              console.error("Username not found in the response");
            }
          } else {
            console.error("User ID not found in token payload");
          }
        } else {
          console.error("Token not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "" && inputRecipient !== "") {
      const messageData = {
        author: username,
        recipient: inputRecipient,
        message: currentMessage,
        time: new Date().toISOString().slice(0, 19).replace('T', ' '), // format to MySQL datetime
      };
      console.log('Sending message data:', messageData);
      try {
        await axios.post("http://localhost:3018/api/chat/send-message", messageData);
        socket.emit("send_message", messageData);
        setMessageList((prevList) => [...prevList, messageData]);
        setCurrentMessage("");
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.log("Message or recipient is empty");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-body">
        {messageList.map((message, index) => (
          <div key={index} className={message.author === username ? "message sent" : "message received"}>
            <p>{message.message}</p>
            <span>{message.time}</span>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={inputRecipient}
          onChange={(e) => setInputRecipient(e.target.value)}
          placeholder="Recipient username"
        />
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
