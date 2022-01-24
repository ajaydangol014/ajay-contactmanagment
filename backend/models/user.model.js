const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema( //create user schema
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String },
    email: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
