import User from "../Models/user.model"
import { ErrorHandler } from "../utils/error"
import bcryptjs from 'bcryptjs'
export const test = (req,res)=>{
    res.send("Hello Test Routes Working properly!")
}

export const updateUser = async(req,res,next)=>{
   if(req.user.id !== req.params.id) return next(ErrorHandler(401,'You can only update your account'));
   try {
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password,10)

    }
    const updateUser = await User.findbyIdAndUpdate(req.params.id,{
        $set:{
           username:req.body.username,
           email : req.body.email,
           password:req.body.password
        }
    },{new:true})

    const {password,...rest} = updateUser._doc
    res.status(200).json(rest)

   } catch (error) {
    next(error)
   }
}