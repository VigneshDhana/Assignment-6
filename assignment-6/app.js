const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Blog = require("./models/Blog");

mongoose.connect("mongodb://localhost/blogs");

const app = express();

app.use(express.static("./public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("home.ejs", { blogs });
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/search", async (req, res) => {
  try {
    const blogs = await Blog.find({ topic: req.body.search });
    res.render("search.ejs", { blogs });
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/:id/edit", async (req, res) => {
  try {
    const blogs = await Blog.findOne({ _id: req.params.id });
    res.render("edit.ejs", { blogs });
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.delete("/:id/delete", async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/add", async (req, res) => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const postedAt = `${date}-${month}-${year}(${hour}:${minutes})}`;
  const post = { ...req.body, posted_at: postedAt };
  try {
    await Blog.create(post);
    res.redirect("/");
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/:id/update", async (req, res) => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const postedAt = `${date}-${month}-${year}(${hour}:${minutes})`;
  const post = { ...req.body, posted_at: postedAt };
  try {
    await Blog.updateOne({ _id: req.params.id }, post);
    res.redirect("/");
  } catch (e) {
    console.log(e.message);
  }
});
app.listen(3000, () => console.log("server running........."));
