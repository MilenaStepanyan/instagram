import express from 'express'
import { getUser, userUpdate } from '../controllers/userController.js'

const router = express.Router()
router.put('/update/:id',userUpdate)
router.get('/get/:id',getUser)
export default router
