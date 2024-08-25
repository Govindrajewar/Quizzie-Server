const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Quizzie Server",
    Version: "0.01",
    Date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
    Time: `${
      new Date().getHours() % 12
    }:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  });
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Server is running & Connected to Database"))
    .catch((err) => console.error("MongoDB connection error: ", err));
});
