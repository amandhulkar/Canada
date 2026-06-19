const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    console.log("REQUEST BODY:", req.body);
    console.log("ROLE RECEIVED:", role);

    const user = await User.create({
      fullName,
      email,
      password,
      role: role || "user"
    });

    console.log("USER CREATED:", user);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
       process.env.JWT_SECRET,
       { expiresIn: "7d" }
    );

  res.status(200).json({
    success: true,
     message: "Login successful",
     token,
       user: {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role, 
  },
    });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { signup, signin };
