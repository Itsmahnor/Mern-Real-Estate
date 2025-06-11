import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './Routes/user.routes.js';

dotenv.config();
const app = express()

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