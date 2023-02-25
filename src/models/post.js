const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
    },
    description: {
      type: {},
      required: true,
      maxlength: 2000,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
