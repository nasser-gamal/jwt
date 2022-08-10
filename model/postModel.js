const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema(
  {
    userId: String,
    content: String,
    imgURL: String,
    likes: Array,
    comments: Array,
  },
  { timestamps: true } //for Time
);

const Post = mongoose.model("post", post);

module.exports = Post;
