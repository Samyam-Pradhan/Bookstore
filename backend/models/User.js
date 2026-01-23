import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//jwt generation
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        id: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET || "YOUR_SECRET_KEY",
      { expiresIn: "30d" } 
    );
  } catch (error) {
    console.error("Token generation error:", error);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
