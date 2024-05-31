import express from "express";
import cors from "cors";
import authRouter from "../server/routes/authRoute.js";
import userRouter from "../server/routes/userRoute.js";
import path from "path";
import fs from "fs";
import {verifyToken} from "../server/middlewares/authMiddleware.js";
import postRouter from "../server/routes/postRoutes.js";
import followerRoutes from "../server/routes/followerRoute.js"

const app = express();

const PORT = 3018;
const UPLOADS_DIR = path.resolve("uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());


app.use("/uploads", express.static("uploads"));


app.use("/api/post", verifyToken, postRouter);
 app.use("/api/user",followerRoutes)  

app.use("/api/", authRouter);
app.use("/api/user", userRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
