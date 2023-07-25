const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
