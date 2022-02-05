const { Schema, model } = require("mongoose");

// import Thought model
const thoughts = require("./Thought");

const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      "Not a valid email address.",
    ],
  },
  thoughts: [thoughts],
};

// *ADD VIRTUAL TO TOTAL 'FRIENDCOUNT' (LENGTH OF FRIENDS ARRAY)

// create new instance of Schema
const schema = new Schema(userSchema);

// create new model
const User = model("user", schema);

module.exports = User;
