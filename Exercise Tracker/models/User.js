const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema([
  {
    username: {
      type: String,
      required: true,
      unique: true
    }
  }
]);

// userSchema.virtual("exercises", {
//   ref: "exercise",
//   localField: "_id",
//   foreignField: "userId"
// });

const User = mongoose.model("user", userSchema);

module.exports = User;
