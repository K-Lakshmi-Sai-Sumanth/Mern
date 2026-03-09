const mongoose = require("mongoose");
const {fieldEncryption} = require("mongoose-field-encryption");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
{
  id: Number, // JSONPlaceholder userId

  name: String,

  username: String,

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
  },

  phone: String,

  website: String
},
{ timestamps: true }
);



UserSchema.index({ id: 1 });

module.exports = mongoose.model("User", UserSchema);