const Users = require("../model/userModel");
const bcrypt = require("bcrypt");

const profile = {
  getProfile: async (req, res) => {
    try {
      Users.findById(req.params.id)
        .select("-password")
        .then((result) => res.json({ data: result }));
    } catch (error) {
      return res.status(404).json({
        msg: error.message,
      });
    }
  },
  editProfile: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);


      // if (user) {
      //   user.firstName = req.body.firstName || user.firstName;
      //   user.lastName = req.body.lastName || user.lastName;
      //   user.email = req.body.email || user.email;
      //   user.password = req.body.password || user.password;
      //   user.password = await bcrypt.hash(req.body.password, 10);
      //   user.image = req.file.originalname || user.image;
      // }



      if (req.file) {
        return res.json({
          msg: req.file
        })
      }






      await user.save();
      res.json({
        msg: user,
      });
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  },
};

module.exports = profile;
