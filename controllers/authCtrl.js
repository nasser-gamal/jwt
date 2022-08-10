const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
   
      const Email = await Users.findOne({ email });
      if (Email) {
        return res.status(201).json({ msg: "Email already exist" });
      }
      // Hash Password
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await new Users({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
      const access_token = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      // const refresh_token = jwt.sign(
      //   { id: user._id },
      //   process.env.REFRESH_TOKEN_SECRET
      // );
      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: "/auth/refresh_token",
      // });
      user.save();
      res.json({
        msg: "Register Sucess",
        id: user.id,
        access_token,
        // refresh_token
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email }).populate("password");
      if (!user) {
        return res.status(201).json({ msg: "email does Not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(201).json({ msg: "Password is incorrect" });
      }
      const access_token = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      // const refresh_token = jwt.sign(
      //   { id: user._id },
      //   process.env.REFRESH_TOKEN_SECRET
      // );
      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: "/auth/refresh_token",
      // });
      res.json({
        id: user.id,
        access_token,
        // refresh_token,
      });
    } catch (error) {
      res.status(201).json({ msg: error.message });
    }
  },

  // logout: async (req, res) => {
  //   try {
  //     // res.clearCookie("refreshtoken", { path: "/auth/refresh_token" });
  //     res.json({ msg: "logged out" });
  //   } catch (error) {
  //     res.status(201).json({ msg: error.message });
  //   }
  // },
  // generateAccessToken: async (req, res) => {
  //   try {
  //     const rf_token = req.cookies.refreshtoken;
  //     if (!rf_token) {
  //       return res.status(201).json({ msg: "please Login In" });
  //     }
  //     jwt.verify(
  //       rf_token,
  //       process.env.REFRESH_TOKEN_SECRET,
  //       async (err, result) => {
  //         if (err) {
  //           return res.status(201).json({ msg: "please login " });
  //         }

  //         const user = await Users.findById(result.id).select("-password");
  //         if (!user) {
  //           return res.status(201).json({ msg: "user does not exist" });
  //         }
  //         const access_token = jwt.sign(
  //           { id: result.id },
  //           process.env.ACCESS_TOKEN_SECRET
  //         );
  //         res.json({
  //           access_token,
  //           user
  //         });
  //       }
  //     );
  //   } catch (error) {
  //     res.status(500).json({ msg: error.message });
  //   }
  // },
};
module.exports = authCtrl;
