import express from 'express'
import { userUpdate } from '../controllers/userController.js'

const router = express.Router()
router.put('/update/:id',userUpdate)
export default router
