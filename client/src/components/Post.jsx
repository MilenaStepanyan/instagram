import axios from "axios";
import { useEffect, useState } from "react";
const Post = () => {
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("second");

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
      console.log(response.data);
      setPosts(response.data);
    } catch (Err) {
      console.log(Err);
    }
  };

  useEffect(() => {
    GettingPosts();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
  
    const formData = new FormData();
    formData.append("content", caption);
    formData.append("postImage", image);
  
    try {
      const res = await axios.post(
        `http://localhost:3018/api/post/upload-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);

      GettingPosts();
      setCaption("");
      setImage(null);
    } catch (error) {
      console.error("Error uploading post:", error);
      setError("Error uploading post");
    }
  };
  

  return (
    <>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      {posts.map((post) => (
       
        <div key={post.id}>
          { console.log(post)}
          <img src={`http://localhost:3018${post.image_url}`} alt="Post" />
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
};

export default Post;
