const express = require("express");
const router = express.Router();
const profile = require("../controllers/profile");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");



router.get("/get_profile/:id", auth, profile.getProfile);
router.put("/editProfile/:id", multer, profile.editProfile);

module.exports = router;
