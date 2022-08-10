const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    uniqe: true,
  },
  password: String,
  image: String,
});

const User = mongoose.model("user", user);

module.exports = User;
