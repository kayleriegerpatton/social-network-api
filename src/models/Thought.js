const { Schema, model } = require("mongoose");
const { format } = require("date-fns");

// import reaction schema
const reactions = require("./Reaction");

const thoughtSchema = {
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    // FORMAT: Saturday February 5th, 2022 @ 11:29:26 p.m.
    // * This is failing because it returns a string, not a number
    // default: format(new Date(), "EEEE MMMM do, yyyy @ hh:mm:ss aaaa"),
    default: new Date(),
  },
  username: {
    type: String,
    required: true,
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
