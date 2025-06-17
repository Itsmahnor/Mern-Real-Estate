import User from "../Models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

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
         avator : existingUser.avator, 
      },
    });
  } catch (err) {
    next(err);
  }
};



export const google = async (req, res) => {
  try {
    // check if user already exists by email
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

    res
  .cookie('access_token', token, { httpOnly: true })
  .status(200)
  .json({ success: true, ...rest });


    } else {
      // generate a random password for Google users
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
       avator : req.body.photo
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Google sign-in failed");
  }
};
