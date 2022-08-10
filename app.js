require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const authRouter = require("./routers/auth");
const postRouter = require("./routers/post");
const profileRouter = require("./routers/profile");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieparser());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

// app.post('/image', upload.single('imgURL'), (req, res) => {
//   console.log(req.file)
// })

app.use("/", authRouter);
app.use("/", postRouter);
app.use("/", profileRouter);

mongoose
  .connect(
    "mongodb+srv://nasser:na123456@cluster0.cyptw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
