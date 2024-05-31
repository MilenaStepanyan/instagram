import express from "express";
import { getPosts, uploadPosts } from "../controllers/postController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload-post", verifyToken, upload.single('postImage'), uploadPosts);
router.get("/get-posts/:id", verifyToken, getPosts);

export default router;
