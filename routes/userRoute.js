import express from "express";
import { getUser, pfpUpdate, searchUsers, } from "../controllers/userController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();
// router.post("/update-bio/:id", bioUpdate);
router.put("/update-pfp/:id", upload.single("profilePicture"), pfpUpdate);
router.get("/get/:id", getUser);
router.get("/search", searchUsers);
export default router;
