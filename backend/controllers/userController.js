import validator from "validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';  // Ensure correct import of userModel

// Function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email address" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user
    const user = await newUser.save();

    // Create token for the user
    const token = createToken(user._id);

    // Return the token to the client
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Compare password with hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Create token for the user
    const token = createToken(user._id);

    // Return the token
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin login (you can extend this for admin-specific features)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists and is an admin
if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
  // Create token for the user
  const token = jwt.sign({email,password},process.env.JWT_SECRET);
   // Return the token
   res.json({ success: true, token });
}
else{
  return res.json({ success: false, message: "Invalid email or password" });
}  
} catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default { loginUser, registerUser, adminLogin }
