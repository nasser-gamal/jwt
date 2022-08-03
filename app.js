require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const authRouter = require("./routers/auth");
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use(cookieparser())

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});



app.use("/", authRouter);

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
