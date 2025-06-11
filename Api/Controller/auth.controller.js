import User from "../Models/user.model.js";
import bcrypt from 'bcrypt'
export const signup = async (req, res) => {
  const { username, email, Password } = req.body;
const newpassword= bcrypt.hashSync(Password,10)
  try {

    const newUser = new User({ username, email, Password:newpassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully!" }); 
  } catch (err) {
    console.error("Error during signup:", err.message); 
    res.status(500).json({ error: "Something went wrong!" }); 
  }
};
