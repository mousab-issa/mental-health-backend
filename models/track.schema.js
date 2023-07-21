const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["breathing", "meditation"], required: true },
});

module.exports = mongoose.model("Track", trackSchema);
