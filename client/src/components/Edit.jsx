import axios from "axios";
import { useEffect, useState } from "react";

const Edit = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("")
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

        handleEditing(userId,token);
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
  const handleEditing = async (id,token) => {
    try {
      const response = await axios.put(
        `http://localhost:3018/api/user/update/${id}`,
        {bio: "Updated bio",},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (Err) {
      console.log(Err);
    }
  };
  return (
    <>
      <p>hello</p>
    </>
  );
};

export default Edit;
