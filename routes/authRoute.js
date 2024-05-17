import express from 'express'
import { logingUser, registeringUser } from '../controllers/authController.js'
const router = express.Router()
router.post("/register",registeringUser)
router.post("/login",logingUser)
export default router