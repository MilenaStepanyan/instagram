import axios from "axios";
import { useState, useEffect } from "react";
import defaultPfp from "../../public/defaultPFP.png";
import Post from "./Post";
const Profile = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

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

        await handleGettingProfileInformation(userId);
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

  const handleGettingProfileInformation = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:3018/api/user/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      setError("Error fetching profile information");
      console.error("Error fetching profile information", error);
    }
  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken(token);

    if (!token) {
      console.error("No token available");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    try {
      await axios.put(
        `http://localhost:3018/api/user/update-pfp/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
        
      await handleGettingProfileInformation(userId);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setError("Error uploading profile picture");
    }
  };


  return (
    <div>
      {error && <p>{error}</p>}
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload Profile Picture</button>
      <h1>{user.fullname}</h1>
      <img
        className="pfp"
        src={
          user.profile_picture
            ? `http://localhost:3018${user.profile_picture}`
            : defaultPfp
        }
        alt="Profile"
      />
      <p>{user.username}</p>
        <Post/>
    </div>
  );
};

export default Profile;
