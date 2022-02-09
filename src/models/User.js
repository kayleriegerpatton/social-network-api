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
  //   array of thought model types by _id
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
  //   array of user model types by _id
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
};

// create new instance of Schema
const schema = new Schema(userSchema, {
  toJSON: {
    getters: true,
  },
});

// virtual to total friends count
schema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create new model
const User = model("user", schema);

module.exports = User;
