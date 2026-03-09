
const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: Number
}, { timestamps: true })

PostSchema.index({ userId: 1 })
PostSchema.index({ createdAt: -1 })

module.exports = mongoose.model("Post", PostSchema)
