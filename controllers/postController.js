import pool from "../lib/db.js";

export const uploadPosts = async (req, res) => {
  const { content } = req.body;
  const user_id = req.user_id;

  console.log("User ID in uploadPosts:", user_id);

  if (!req.file) {
    return res.status(400).json({ msg: "File is required" });
  }

  const postImgUrl = `/uploads/${req.file.filename}`;
  try {
    const [result] = await pool.query(
      `INSERT INTO posts (content, image_url, user_id) VALUES (?, ?, ?)`,
      [content, postImgUrl, user_id]
    );
    if (result.affectedRows === 0) {
      return res.status(500).json({ msg: "Failed to upload post" });
    }
    res.status(201).json({ msg: "Post uploaded successfully" });
  } catch (err) {
    console.error("Error uploading post:", err);
    res.status(500).json({ msg: "Server error", error: err });
  }
};
export const getPosts = async (req, res) => {
  const { id } = req.params; 
  try {
    const [result] = await pool.query(
      `SELECT * FROM posts WHERE user_id=? ORDER BY created_at DESC`, 
      [id]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};

