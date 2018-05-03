var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now }
});

PostSchema.methods.summary = function() {
  var summary = {
    timestamp: this.timestamp,
    id: this._id.toString()
  };

  return summary;
};

module.exports = mongoose.model("PostSchema", PostSchema);
