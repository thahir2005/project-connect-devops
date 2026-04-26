const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// connect DB
mongoose.connect("mongodb+srv://admin:admin123@cluster0.1xglno6.mongodb.net/authDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// register
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });

  await user.save();
  res.send("User Registered");
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token });
});

// start server
app.listen(5000, () => {
  console.log("Auth service running on port 5000");
});
