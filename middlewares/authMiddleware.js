import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../lib/db.js";

export const registeringUser = async (req, res) => {
    const {mobile,username,fullname,password} = req.body
    if(!mobile || !username || !fullname || !password){
        return res.status(400).json({msg:'please fill all the fields'})
    }
};
