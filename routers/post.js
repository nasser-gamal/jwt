const express = require("express");
const router = express.Router();
const handlePosts = require("../controllers/post");
const auth = require("../middlewares/auth");

router.post("/post", auth, handlePosts.post);
router.get("/all-posts", auth, handlePosts.getAllPosts);
router.put("/comments/:id" , handlePosts.addComment);

module.exports = router;
