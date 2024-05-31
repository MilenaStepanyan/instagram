import pool from "../lib/db.js";

export const followUser = async (req, res) => {
  const { id } = req.params;
  const follower_id = req.user_id;
  if (id === follower_id.toString()) {
    return res.status(400).json({ msg: "You cannot follow yourself" });
  }
  try {
    await pool.query(`INSERT INTO followers (user_id, follower_id) VALUES (?, ?)`, [id, follower_id]);
    res.status(201).json({ msg: "Followed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

export const unfollowUser = async (req, res) => {
  const { id } = req.params;
  const follower_id = req.user_id;

  try {
    await pool.query(`DELETE FROM followers WHERE user_id = ? AND follower_id = ?`, [id, follower_id]);
    res.status(200).json({ msg: "Unfollowed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error unfollowing user", error: err });
  }
};



export const getFollowers = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(`SELECT u.id, u.username FROM users u INNER JOIN followers f ON u.id = f.follower_id WHERE f.user_id = ?`, [id]);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error getting followers", error: err });
  }
};

export const getFollowing = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(`SELECT u.id, u.username FROM users u INNER JOIN followers f ON u.id = f.user_id WHERE f.follower_id = ?`, [id]);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error getting following list", error: err });
  }
};
