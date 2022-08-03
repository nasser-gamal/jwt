const express = require("express");
const router= express.Router()
const authCtrl = require("../controllers/authCtrl");
const profile = require("../controllers/users")

router.post("/auth/register", authCtrl.register);
router.post("/auth/login", authCtrl.login);
router.post("/auth/logout", authCtrl.logout);
router.post("/auth/refresh_token", authCtrl.generateAccessToken);
module.exports = router;
