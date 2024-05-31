import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  
  jwt.verify(token, "Secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
    req.user_id = decoded.user.id;
    next();
  });
};
