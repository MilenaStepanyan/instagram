import express from "express";
import { followUser, unfollowUser, getFollowers, getFollowing } from "../controllers/followerController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:id/follow", verifyToken, followUser);
router.post("/:id/unfollow", verifyToken, unfollowUser);
router.get("/:id/followers", verifyToken, getFollowers);
router.get("/:id/following", verifyToken, getFollowing);

export default router;
