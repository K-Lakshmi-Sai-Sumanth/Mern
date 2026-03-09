const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  id: Number,
  userId: Number,
  title: String,
  completed: Boolean
});

TodoSchema.index({ userId: 1 });

module.exports = mongoose.model("Todo", TodoSchema);