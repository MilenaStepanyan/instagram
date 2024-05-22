import axios from "axios";
import { useState, useEffect } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [pfp, setPfp] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

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

        handleGettingProfileInformation(userId);
      } catch (error) {
        setError("Error decoding token");
        console.error("Error decoding token", error);
      }
    };

    fetchData();
  }, []);

  const getUserIdFromToken = (token) => {
    const payload = token.split(".")[1];
    console.log(payload);
    const decodedPayload = atob(payload);
    const parsedData = JSON.parse(decodedPayload);
    const userId = parsedData.user.id;
    return userId;
  };

  const handleGettingProfileInformation = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3018/api/user/get/${id}`
      );
      console.log("Profile Data:", response.data);
      const { username, fullName, profile_picture, bio } = response.data;
      setUsername(username);
      setFullName(fullName);
      setPfp(profile_picture);
      setBio(bio);
    } catch (error) {
      setError("Error fetching profile information");
      console.error("Error fetching profile information", error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {error && <p>{error}</p>}
      <img src={pfp} alt="Profile" />
      <h2>{fullName}</h2>
      <p>{username}</p>
      <p>{bio}</p>
    </div>
  );
};

export default Profile;
