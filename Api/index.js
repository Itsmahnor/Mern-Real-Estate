import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';
import userRoutes from './Routes/user.routes.js';
import userauth from './Routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import listingRoutes from './Routes/listingRoutes.js';
dotenv.config();
const app = express()
app.use(cookieParser())
app.use(express.json())
// mongo db connect
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connect to mongoDb")
}).catch((err)=>{
     console.log("Cannot Connect to mongoDb",err)
})


app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL
  credentials: true, // ✅ Allow cookies
}));

app.listen(3000, ()=>{
    console.log("Server is running on port 3000!")
})

// routes
app.use("/api/user",userRoutes)
app.use("/api/auth",userauth)
app.use("/api/listing",listingRoutesRoutes)

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