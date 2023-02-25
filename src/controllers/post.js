const User = require("../models/user");
const Post = require("../models/post");
const slugify = require("slugify");

// Create Post
exports.create = async (req, res) => {
  try {
    console.log("=========>", req.fields);
    console.log("=========>", req.files);
    const { name, description } = req.fields;
    const author = User.firstName;
    console.log("Author=========>", author);

    const { photo } = req.files;
    console.log("PHOTO========>", photo);

    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!description.trim()) {
      return res.json({ error: "Description is required" });
    }

    // Create Post
    const post = new Post({ ...req.fields, slug: slugify(name) });

    if (photo) {
      post.photo.data = fs.readFileSync(photo.path);
      post.photo.contentType = photo.type;
    }

    await post.save();
    res.json(post);
  } catch (err) {
    return res.status(400).json({ status: "fail", data: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const posts = await posts.find({}).select("-photo").limit(10).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    return res.status(400).json({ status: "fail", data: err.message });
  }
};

exports.read = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).select("-photo");
    res.json(post);
  } catch (err) {
    return res.status(400).json({ status: "fail", data: err.message });
  }
};

exports.photo = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).select("photo");

    if (post.photo.data) {
      res.set("Content-Type", post.photo.contentType);
      return res.send(post.photo.data);
    }
  } catch (err) {
    return res.status(400).json({ status: "fail", data: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId).select("-photo");
    res.json(post);
  } catch (err) {
    return res.status(400).json({ status: "fail", data: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    console.log("=========>", req.fields);
    console.log("=========>", req.files);
    const { name, description } = req.fields;
    const author = User.firstName;
    console.log("Author=========>", author);

    const { photo } = req.files;
    console.log("PHOTO========>", photo);

    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!description.trim()) {
      return res.json({ error: "Description is required" });
    }

    // Update Post
    const post = new Post.findByIdAndUpdate(
      req.params.postId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      post.photo.data = fs.readFileSync(photo.path);
      post.photo.contentType = photo.type;
    }

    await post.save();
    res.json(post);
  } catch (err) {
    return res.status(400).json({ status: "fail", data: err.message });
  }
};
