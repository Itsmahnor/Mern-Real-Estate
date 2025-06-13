import User from "../Models/user.model.js";
import bcrypt from 'bcrypt'
export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
const newpassword= bcrypt.hashSync(password,10)
  try {

    const newUser = new User({ username, email, password:newpassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully!" }); 
  } catch (err) {
   next(err)
  }
};


// Sign In Controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User not found!" });
    }

    // 2. Compare hashed passwords
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Incorrect password!" });
    }

    // 3. Login successful
    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
