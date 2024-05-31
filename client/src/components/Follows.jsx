import axios from "axios";
import  { useEffect, useState } from "react";

const FollowersList = ({ userId }) => {
    const [followers, setFollowers] = useState([]);
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      const getFollowers = async () => {
        try {
          console.log(`Fetching followers for user ID: ${userId}`); 
          const response = await axios.get(`http://localhost:3018/api/user/${userId}/followers`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Followers response:', response.data); 
          setFollowers(response.data);
        } catch (err) {
          console.error('Error fetching followers:', err);
        }
      };
      getFollowers();
    }, [userId, token]);
  
    return (
      <div>
        <h3>Followers</h3>
        <ul>
          {followers.map(follower => (
            <li key={follower.id}>{follower.username}</li>
          ))}
        </ul>
      </div>
    );
  };

const FollowingList = ({ userId }) => {
  const [following, setFollowing] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await axios.get(`http://localhost:3018/api/user/${userId}/following`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFollowing(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getFollowing();
  }, [userId, token]);

  return (
    <div>
      <h3>Following</h3>
      <ul>
        {following.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export { FollowersList, FollowingList };
