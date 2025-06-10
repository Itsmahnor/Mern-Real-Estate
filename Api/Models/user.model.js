import { Timestamp } from "bson";
import mongoose from "mongoose";
import { type } from "os";

const Userschema = mongoose.Schema({
    username:{
        type: String,
        required : true,
        unique:true
    },
      email:{
        type: String,
        required : true,
        unique:true
    },
      Password:{
        type: String,
        required : true,
   
    },
},{Timestamp:true});

const User = mongoose.model("User",Userschema);

export default User;