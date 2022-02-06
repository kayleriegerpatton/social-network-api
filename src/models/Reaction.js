const { Schema } = require("mongoose");
const { format } = require("date-fns");

const reactionSchema = {
  reactionId: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  reactionBody: {
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
    // FORMAT: Saturday February 5th, 2022 @ 11:29:26 p.m.
    // * This is failing because it returns a string, not a number
    // default: format(new Date(), "EEEE MMMM do, yyyy @ hh:mm:ss aaaa"),
    default: new Date(),
  },
};

const schema = new Schema(reactionSchema);

module.exports = schema;
