import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './Routes/user.routes.js';
import userauth from './Routes/auth.routes.js'

dotenv.config();
const app = express()

app.use(express.json())
// mongo db connect
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connect to mongoDb")
}).catch((err)=>{
     console.log("Cannot Connect to mongoDb",err)
})




app.listen(3000, ()=>{
    console.log("Server is running on port 3000!")
})

// routes
app.use("/api",userRoutes)
app.use("/api/auth",userauth)
// middle ware
app.use((err,req,res,next)=>{
    const statuscode = err.statuscode || 500
    const message = err.message || "Internet Server Error"
return res.status(statuscode).json({
    success: false,
    statuscode,
    message
})
})