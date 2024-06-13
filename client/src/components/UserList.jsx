import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserList({ username }) {
  const [users, setUsers] = useState([]);
  const [newChatUsername, setNewChatUsername] = useState('');
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3018/api/chat/get-recent-chats/${username}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (username) {
      fetchUsers();
    }
  }, [username]);

  const startNewChat = () => {
    if (newChatUsername.trim()) {
      navigate(`/chat/${newChatUsername}`);
    }
  };

  return (
    <div className="user-list">
      <h2>Recent Chats</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <Link to={`/chat/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
      <div className="new-chat">
        <input
          type="text"
          value={newChatUsername}
          onChange={(e) => setNewChatUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button onClick={startNewChat}>Start Chat</button>
      </div>
    </div>
  );
}

export default UserList;
