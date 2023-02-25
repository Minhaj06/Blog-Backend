const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

// Middlewares
const { requireSignin, isAdmin } = require("../middlewares/auth.js");

// Controllers
const { create, list, read, photo, update } = require("../controllers/post.js");
const { remove } = require("../models/post.js");

// Routes
router.post("/post", requireSignin, isAdmin, formidable(), create);
router.get("/posts", list);
router.get("/post/:slug", read);
router.get("/post/photo/:postId", photo);
router.delete("/post/:postId", requireSignin, isAdmin, remove);
router.put("/post/:postId", requireSignin, isAdmin, formidable(), update);

module.exports = router;
