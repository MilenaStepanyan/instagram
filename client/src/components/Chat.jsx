import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserList from "./UserList";

function Chat({ socket }) {
  const { username: recipient } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState("");
  const messageIds = new Set();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.user && payload.user.id) {
            const response = await axios.get(`http://localhost:3018/api/user/get/${payload.user.id}`);
            const userUsername = response.data.username;
            if (userUsername) {
              setUsername(userUsername);
              socket.emit("join", userUsername);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();
  }, [socket]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3018/api/chat/get-messages/${username}/${recipient}`
      );
      const newMessages = response.data.filter(message => !messageIds.has(message.id));
      newMessages.forEach(message => messageIds.add(message.id));
      setMessageList(prevMessages => [...prevMessages, ...newMessages]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [username, recipient]);

  useEffect(() => {
    if (username && recipient) {
      fetchMessages();
    }
  }, [username, recipient, fetchMessages]);

  const sendMessage = async () => {
    if (currentMessage !== "" && recipient !== "") {
      const messageData = {
        author: username,
        recipient: recipient,
        message: currentMessage,
        time: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      try {
        const response = await axios.post(
          "http://localhost:3018/api/chat/send-message",
          messageData
        );
        const sentMessage = response.data.message;
        if (!messageIds.has(sentMessage.id)) {
          messageIds.add(sentMessage.id);
          setMessageList((prevList) => [...prevList, sentMessage]);
        }
        setCurrentMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    const handleMessageReceive = (data) => {
      if (!messageIds.has(data.id)) {
        messageIds.add(data.id);
        setMessageList((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.on("receive_message", handleMessageReceive);

    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket]);

  return (
    <div className="chat-container">
      <UserList username={username} />
      <div className="chat-window">
        <div className="chat-body">
          {messageList.map((message, index) => (
            <div
              key={index}
              className={
                message.author === username
                  ? "message sent"
                  : "message received"
              }
            >
              <p>{message.message}</p>
              <span>{message.time}</span>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
