const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

const Exercise = mongoose.model("exercise", exerciseSchema);

module.exports = Exercise;
