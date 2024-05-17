import express from 'express'
import cors from 'cors'
import authRouter from '../server/routes/authRoute.js'
const app = express()
const PORT = 3018
app.use(cors())
app.use(express.json())
app.use("/user",authRouter)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})