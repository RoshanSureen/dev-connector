var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  timestamp: { type: Date, default: Date.now }
});

UserSchema.methods.summary = function() {
  var summary = {
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    timestamp: this.timestamp,
    id: this._id.toString()
  };

  return summary;
};

module.exports = mongoose.model("UserSchema", UserSchema);
