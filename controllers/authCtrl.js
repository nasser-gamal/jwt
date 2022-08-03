const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      // Check If userName Exist Or Not
      const user_name = await Users.findOne({ userName });
      if (user_name) {
        return res.status(201).json({ msg: "UserName already exist" });
      }
      // Check If email exist
      const Email = await Users.findOne({ email });
      if (Email) {
        return res.status(201).json({ msg: "Email already exist" });
      }
      // Hash Password
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await new Users({
        userName,
        email,
        password: hashPassword,
      });
      const access_token = jwt.sign(
        { id: user._id },
        process.env.ACCESSTOKENSECRET
      );
      const refresh_token = jwt.sign(
        { id: user._id },
        process.env.REFRESHTOKENSECRET
      );
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/auth/refresh_token",
      });
      user.save();
      res.json({
        msg: "Register Sucess",
        id: user.id,
        access_token,
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
        process.env.ACCESSTOKENSECRET
      );
      const refresh_token = jwt.sign(
        { id: user._id },
        process.env.REFRESHTOKENSECRET
      );

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/auth/refresh_token",
      });

      res.json({
        msg: "Login Sucess",
        id: user.id,
        access_token,
        refresh_token,
      });
    } catch (error) {
      res.status(201).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/auth/refresh_token" });
      res.json({ msg: "logged out" });
    } catch (error) {
      res.status(201).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({ msg: "please Login In" });
      }
      jwt.verify(
        (rf_token, process.env.REFRESHTOKENSECRET),
        async (err, result) => {
          if (err) {
            return res.status(400).json({ msg: "please login " });
          }
          const user = await Users.findById(result._id);
          if (!user) {
            return res.status(400).json({ msg: "user does not exist" });
          }
          const access_token = jwt.sign({ id: result._id }, "accessToken");
          res.json({
            access_token,
          });
        }
      );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      await Users.findById(req.params.id).then((result) =>
      res.json({ msg: result })
    );
    } catch (erro) {
      return res.json({
        msg: erro
      })
   }
  },
};

module.exports = authCtrl;
