import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import insta from "../../public/instaWriting.png";
import defaultPfp from "../../public/defaultPFP.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faHouse,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaCloudUploadAlt } from "react-icons/fa";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import Post from "./Post";
import { FollowersList, FollowingList } from "./Follows";
import Modal from "./Modal";
import Upload from "./Upload";

const Profile = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);

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
        setUserId(userId);
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

  const handleFileChange = async (event) => {
    setProfilePicture(event.target.files[0]);

    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken(token);

    if (!token) {
      console.error("No token available");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", event.target.files[0]);

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

  const triggerFileInput = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <div className="container">
      <div className="menu">
        <div className="head-part">
          <img
            className="insta-icon-profile"
            src={insta}
            alt="instagram-icon"
          />
        </div>
        <ul className="ul-list">
          <li className="list">
            <FontAwesomeIcon className="icon" icon={faHouse} />
            Home
          </li>
          <li className="list">
            <Link to="/search" className="list1 list">
            <FontAwesomeIcon className="icon" icon={faSearch} />
            Search
            </Link>
           
          </li>
          <li className="list">
            <FontAwesomeIcon className="icon" icon={faCompass} />
            Explore
          </li>
          <li className="list">
            <Link className="list1 list" to={`/chat/${user.username}`}>
            <FontAwesomeIcon className="icon" icon={faFacebookMessenger} />
              Messages
            </Link>
          </li>
          <li className="list" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon className="icon" icon={faSquarePlus} />
            Create
          </li>
          <li className="special">
            <img
              src={
                user.profile_picture
                  ? `http://localhost:3018${user.profile_picture}`
                  : defaultPfp
              }
              className="profile-icon"
              alt="Profile"
              onClick={triggerFileInput}
              style={{ cursor: "pointer" }}
            />
            <p className="profile-text">Profile</p>
          </li>
        </ul>
      </div>
      <div className="whole-profile">
        <div className="headPart">
          <div className="img-pfp">
            <div className="name-pfp">
              <h1>{user.fullname}</h1>

              <img
                className="pfp"
                src={
                  user.profile_picture
                    ? `http://localhost:3018${user.profile_picture}`
                    : defaultPfp
                }
                alt="Profile"
                onClick={triggerFileInput}
                style={{ cursor: "pointer" }}
              />
              <h4>{user.username}</h4>
            </div>
          </div>
          <div className="upload-container">
            <input
              type="file"
              id="fileUpload"
              className="uploadSign"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <div className="flws">
            {userId && <FollowersList userId={userId} />}
            {userId && <FollowingList userId={userId} />}
          </div>
        </div>
        {error && <p>{error}</p>}
        <div className="profile-container"></div>

        <Post />
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Upload onUploadComplete={() => setShowModal(false)} />
      </Modal>

    </div>
  );
};

export default Profile;
