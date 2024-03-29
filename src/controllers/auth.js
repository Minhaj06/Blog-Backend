const User = require("../models/user.js");
const { hashPassword, comparePassword } = require("../helpers/auth.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    // 1. Destructure name, email, password from req.body
    const { firstName, lastName, email, password } = req.body;

    // 2. All fields require validation
    if (!firstName.trim()) {
      return res.json({ error: "First name is required" });
    }
    if (!lastName.trim()) {
      return res.json({ error: "Last name is required" });
    }
    // if (!email.trim()) {
    //   return res.json({ error: "Email is required" });
    // }
    if (!password.trim()) {
      return res.json({ error: "Password is required" });
    }

    // 3. Check if email is taken / Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ erro: "Email is taken" });
    }

    // 4. Has password
    const hashedPassword = await hashPassword(password);

    // 5. Register user / Save user details
    const user = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    // 6. Create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 7. Send response
    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // 1. Destructure email, password from req.body
    const { email, password } = req.body;

    // 2. All fields require validation
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    // 3. Check if email is taken
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    // 4. Compare Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    // 5. Create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 6. Send response
    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};
