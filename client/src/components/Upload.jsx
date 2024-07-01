import { useState } from "react";
import axios from "axios";

const Upload = ({ userId, onUploadComplete }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");

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

      setCaption("");
      setImage(null);

      onUploadComplete();
    } catch (error) {
      console.error("Error uploading post:", error);
      setError("Error uploading post");
    }
  };

  return (
    <div>
      <form className="post-form" onSubmit={handleUpload}>
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
      {error && <p>{error}</p>}
    </div>
  );
};

export default Upload;
