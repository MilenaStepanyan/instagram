import express from 'express'
import cors from 'cors'
import authRouter from '../server/routes/authRoute.js'
import userRouter from '../server/routes/userRoute.js'
const app = express()
const PORT = 3018
app.use(cors())
app.use(express.json())
app.use("/api/",authRouter)
app.use('/api/user',userRouter)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})