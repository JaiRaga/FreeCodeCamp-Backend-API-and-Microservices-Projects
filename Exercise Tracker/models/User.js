const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
});

userSchema.virtual("exercises", {
  ref: "Exercise",
  localField: "_id",
  foreignField: "owner"
});

const User = mongoose.model("user", userSchema);

module.exports = User;
