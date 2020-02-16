const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema([
  {
    shortUrl: {
      type: Number,
      required: true
    },
    originalUrl: {
      type: String,
      required: true
    }
  }
]);

const Url = mongoose.model("url", urlSchema);

module.exports = Url;
