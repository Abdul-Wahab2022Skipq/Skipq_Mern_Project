const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profilePicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    bio: { type: String },
    city: { type: String },
    country: { type: String },
    relationShip: { type: String, enum: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
