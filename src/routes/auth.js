const express = require("express");
const router = express.Router();

// Middlewares
const { requireSignin, isAdmin } = require("../middlewares/auth.js");

// Controllers
const { register, login } = require("../controllers/auth.js");

// Routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
