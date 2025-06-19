import User from "../Models/user.model.js";
import { ErrorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";

export const test = (req, res) => {
  res.send("Test route working!");
};

export const updateUser = async (req, res, next) => {
  // Make sure the ID in token matches param ID
  if (req.user?.id !== req.params.id) {
    return next(ErrorHandler(401, "You can only update your account"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ success: true, ...rest });
  } catch (error) {
    next(error);
  }
};
