import pool from '../lib/db.js';

export const sendMessage = async (req, res) => {
  const { author, recipient, message, time } = req.body;
  try {
    const [result] = await pool.execute(
      "INSERT INTO Messages (author, recipient, message, time) VALUES (?, ?, ?, ?)",
      [author, recipient, message, time]
    );
    res.status(200).json({ message: "Message sent successfully", result });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getMessages = async (req, res) => {
    try {
      const { username, recipient } = req.params;
      const [rows] = await pool.execute(
        'SELECT * FROM Messages WHERE (author = ? AND recipient = ?) OR (author = ? AND recipient = ?) ORDER BY time',
        [username, recipient, recipient, username]
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  export const getRecentChats = async (req, res) => {
    try {
      const { username } = req.params;
      const [rows] = await pool.execute(
        'SELECT DISTINCT recipient AS username FROM Messages WHERE author = ? UNION SELECT DISTINCT author AS username FROM Messages WHERE recipient = ?',
        [username, username]
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching recent chats:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  

  