var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" },
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" }
    }
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" },
      text: { type: String, required: true },
      name: { type: String },
      avatar: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PostSchema", PostSchema);
