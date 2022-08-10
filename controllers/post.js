const Post = require("../model/postModel");

const handlePosts = {
  post: async (req, res) => {
    try {
      const post = await new Post(req.body);
      post
        .save()
        .then((result) => res.json(result))
        .catch((error) => res.status(404).json(error));
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .then((result) => res.json({ posts: result }));
    } catch (error) {
      return res.status(404).json({
        msg: error.message,
      });
    }
  },
  addComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("comments");
      post = { ...post, commments: req.body };
      // if (post) {
      //   post.comments.push(req.body);
      // }
      res.json({
        msg: post,
      });
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  },
};

module.exports = handlePosts;
