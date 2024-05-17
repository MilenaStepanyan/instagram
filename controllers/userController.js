import pool from "../lib/db.js";

export const userUpdate = async (req, res) => {
  const { id } = req.params;
  const { profile_picture, bio } = req.body;
  try {
    const [updatedProfile] = await pool.query(
      `UPDATE users SET bio=?,profile_picture=? WHERE id = ?`,
      [bio, profile_picture, id]
    );
    if (updatedProfile.affectedRows === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "User updated succesfully" });
  } catch (Err) {
    console.log(Err);
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
  } catch (Err) {
    console.log(Err);
  }
};
