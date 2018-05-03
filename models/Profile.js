var mongoose = require("mongoose");

var ProfileSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now }
});

ProfileSchema.methods.summary = function() {
  var summary = {
    timestamp: this.timestamp,
    id: this._id.toString()
  };

  return summary;
};

module.exports = mongoose.model("ProfileSchema", ProfileSchema);
