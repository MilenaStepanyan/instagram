import  { useState } from 'react';
import axios from 'axios';


const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3018/api/user/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3018/api/user/${userId}/follow`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(results.map(user => user.id === userId ? { ...user, isFollowing: true } : user));
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3018/api/user/${userId}/unfollow`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(results.map(user => user.id === userId ? { ...user, isFollowing: false } : user));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul className="search-results">
        {results.map((user) => (
          <li key={user.id}>
            <img src={`http://localhost:3018${user.profile_picture}`} alt="Profile" />
            <p>{user.username} - {user.fullname}</p>
            {user.isFollowing ? (
              <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
            ) : (
              <button onClick={() => handleFollow(user.id)}>Follow</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
