import axios from "axios";
import { useEffect, useState } from "react";
const Post = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please log in.");
        return;
      }

      try {
        const userId = getUserIdFromToken(token);
        if (!userId) {
          setError("User ID not found in token");
          return;
        }
      } catch (error) {
        setError("Error decoding token");
        console.error("Error decoding token", error);
      }
    };

    fetchData();
  }, []);

  const getUserIdFromToken = (token) => {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const parsedData = JSON.parse(decodedPayload);
    return parsedData.user.id;
  };
  const GettingPosts = async () => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken(token);
    try {
      const response = await axios.get(
        `http://localhost:3018/api/post/get-posts/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(response.data);
    } catch (Err) {
      console.log(Err);
    }
  };

  useEffect(() => {
    GettingPosts();
  }, []);


  return (
<>
      <div className="posts-container">
        {posts.map((post) => (
          <div className="post-item" key={post.id}>
            <img className="posts" src={`http://localhost:3018${post.image_url}`} alt="Post" />
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;
