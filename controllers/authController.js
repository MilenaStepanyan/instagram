import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../lib/db.js";

export const registeringUser = async (req, res) => {
  const { mobile, username, fullname, password } = req.body;
  if (!mobile || !username || !fullname || !password) {
    return res.status(400).json({ msg: "please fill all the fields" });
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const connection = await pool.getConnection();

    let [existingUser] = await pool.query(
      `
        SELECT * FROM users WHERE username = ? OR mobile = ?
        `,
      [username, mobile]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ msg: "User or mobile already exists" });
    }
    await connection.query(
      ` 
             INSERT INTO users (mobile,username,fullname,password) VALUES (?,?,?,?)
        `,
      [mobile, username, fullname, hashedPassword]
    );
    connection.release();
    return res.status(200).json({ msg: "User registered succesfully" });
  } catch (Err) {
    console.log(Err);
  }
};
export const logingUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide username And password" });
  }
  try {
    const connection = await pool.getConnection();
    let [existingUser] = await pool.query(
      `SELECT * FROM users WHERE username=?`,
      [username]
    );
    connection.release();
    if (existingUser.length === 0) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }
    const isHashedPassword = await bcrypt.compare(
      password,
      existingUser[0].password
    );
    if (!isHashedPassword) {
      return res
        .status(400)
        .json({ msg: "Password or Username are incorrect" });
    }
    const payload = {
      user: {
        id: existingUser[0].id,
      },
    };

    const token = jwt.sign(payload, "Secret_key", { expiresIn: "24h" });
    console.log("Token:", token);
    console.log("User Data:", existingUser.length);
    res.status(200).json({ token });
  } catch (Err) {
    console.log(Err);
  }
};
