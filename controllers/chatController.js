import pool from "../lib/db.js";
export const getMessages = async (req, res) => {
  const { recipient } = req.params;
  const author = req.user_id;
  try {
      const [result] = await pool.query(
          `SELECT * FROM Messages WHERE (author = ? AND recipient = ?) OR (author = ? AND recipient = ?) ORDER BY time`,  // Use 'time'
          [author, recipient, recipient, author]
      );
      res.status(200).json(result);
  } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  const { recipient, message } = req.body;
  const author = req.user_id;
  try {
      await pool.query(
          `INSERT INTO Messages (author, recipient, message, time) VALUES (?, ?, ?, NOW())`,  // Use 'time'
          [author, recipient, message]
      );
      res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

export const getRecentConversations = async (req, res) => {
  const author = req.user_id;
  try {
      const [result] = await pool.query(
          `SELECT DISTINCT recipient AS id, recipient AS username, NULL AS profile_picture
          FROM Messages
          WHERE author = ?
          UNION
          SELECT DISTINCT author AS id, author AS username, NULL AS profile_picture
          FROM Messages
          WHERE recipient = ?
          ORDER BY time DESC`,  // Use 'time'
          [author, author]
      );
      res.status(200).json(result);
  } catch (error) {
      console.error("Error fetching recent conversations:", error);
      console.error("SQL Query:", error.sql);  // Log the SQL query
      console.error("SQL Message:", error.sqlMessage);  // Log the SQL error message
      res.status(500).json({ message: "Internal server error" });
  }
};
