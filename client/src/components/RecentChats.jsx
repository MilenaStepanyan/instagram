import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RecentChats({ username }) {
  const [recentChats, setRecentChats] = useState([]);

  useEffect(() => {
    const fetchRecentChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3018/api/chat/get-recent-chats/${username}`);
        setRecentChats(response.data);
      } catch (error) {
        console.error('Error fetching recent chats:', error);
      }
    };

    if (username) {
      fetchRecentChats();
    }
  }, [username]);

  return (
    <div className="recent-chats">
      <h2>Recent Chats</h2>
      <ul>
        {recentChats.map((chat, index) => (
          <li key={index}>
            <Link to={`/chat/${chat.recipient}`}>{chat.recipient}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentChats;
