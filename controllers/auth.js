import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register

export const register = async (req, res) => {
  try {
    const {
      // username,
      email,
      password,
      firstName,
      lastName,
      location,
      occupation,
      picturePath,
      friends,
    } = req.body;
    // const picturePath = req.file.path;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await User.create({
      // username,
      email,
      password: hashedPassword,
      picturePath,
      firstName,
      lastName,
      friends,
      location,
      occupation,
      viewedProfile: Math.random() * 100,
      impressions: Math.random() * 100,
      viewedProfile: Math.random() * 100,
    });
    // const token = jwt.sign(
    //   { email: result.email, id: result._id },
    //   process.env.SECRET,
    //   { expiresIn: "1h" }
    // );
    // res.status(201).json({ result, token });
    const savedUser = await result.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log("register error")
    console.log(error);
  }
};


// Login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        delete user.password;
        res.status(200).json({ user, token });
    } catch (error) {
      
      console.log("login error")
      console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

