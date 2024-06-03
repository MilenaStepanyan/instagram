import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Chat({ socket }) {
  const { username: recipient } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const username = payload.user.username;
        setUsername(username);
        socket.emit("join", username);
      }
    };
    fetchUsername();
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        recipient,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };

      await axios.post("http://localhost:3018/api/chat/send-message", messageData);
      socket.emit("send_message", messageData);
      setMessageList((prevList) => [...prevList, messageData]);
      setCurrentMessage("");
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
