const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Exercise = mongoose.model("exercise", exerciseSchema);

module.exports = Exercise;
