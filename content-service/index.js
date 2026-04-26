const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// connect DB (use SAME Atlas or new DB)
mongoose.connect("mongodb+srv://admin:admin123@cluster0.1xglno6.mongodb.net/contentDB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// schema
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", PostSchema);

// create post
app.post("/posts", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send("Post created");
});

// get posts
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.listen(5001, () => {
  console.log("Content service running on port 5001");
});
