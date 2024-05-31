import pool from "../lib/db.js";
import path from "path";
const uploadDirectory = path.resolve("../../client/uploads");
 console.log(uploadDirectory);
// export const bioUpdate = async (req, res) => {
//   const { id } = req.params;
//   const { bio } = req.body;
//   try {
//     const [result] = await pool.query(`UPDATE users SET bio=? WHERE id = ?`, [
//       bio,
//       id,
//     ]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ msg: "User not found" });
//     }
//     return res.status(200).json({ msg: "User updated successfully" });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };
export const pfpUpdate = async (req, res) => {
  const { id } = req.params;
  if (!req.file) {
    return res.status(400).json({ msg: "Profile picture is required" });
  }
  const profilePictureUrl = `/uploads/${req.file.filename}`;
  try {
    const [result] = await pool.query(
      `UPDATE users SET profile_picture=? WHERE id = ?`,
      [profilePictureUrl, id]
    ); 
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await pool.query(`SELECT * FROM users WHERE id=?`, [id]);
    if (user.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json(user[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const searchUsers = async (req, res) => {
  const { query } = req.query;
  const userId = req.user_id;

  try {
    const [users] = await pool.query(
      `SELECT id, username, fullname, profile_picture FROM users WHERE username LIKE ? OR fullname LIKE ?`,
      [`%${query}%`, `%${query}%`]
    );

    const [following] = await pool.query(
      `SELECT user_id FROM followers WHERE follower_id = ?`,
      [userId]
    );

    const followingIds = new Set(following.map(row => row.user_id));

    const result = users.map(user => ({
      ...user,
      isFollowing: followingIds.has(user.id),
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error searching users", error: err });
  }
};

