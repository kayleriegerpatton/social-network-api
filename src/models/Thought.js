const { Schema, model } = require("mongoose");
const formatDate = require("../utils/formatDate");

// import reaction schema
const reactions = require("./Reaction");

const thoughtSchema = {
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate,
  },
  //   reactions is subdocument schema
  reactions: [reactions],
};

// create new Schema instance
const schema = new Schema(thoughtSchema, {
  toJSON: {
    getters: true,
  },
});

// virtual to total reaction count
schema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", schema);

module.exports = Thought;
