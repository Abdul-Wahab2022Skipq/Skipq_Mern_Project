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
    desc: { type: String },
    city: { type: String },
    from: { type: String },
    relationShip: { type: String, enum: [1, 2, 3] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
