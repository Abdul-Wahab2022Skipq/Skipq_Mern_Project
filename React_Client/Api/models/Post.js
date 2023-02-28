const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    desc: { type: String },
    img: { type: String },
    likes: { type: Array, default: [] },
    type: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
