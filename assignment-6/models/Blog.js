const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  topic: String,
  description: String,
  posted_at: String,
  posted_by: String,
});

const Blog = mongoose.model("blogs", blogSchema);

module.exports = Blog;
