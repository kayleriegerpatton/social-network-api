const { Thought } = require("../../models");

const getThoughts = async (req, res) => {
  const thoughts = await Thought.find({});
  console.log(thoughts);
  return res.json(thoughts);
  // return res.send("getThoughts");
};
const getThoughtById = (req, res) => {
  return res.send("getThoughtById");
};
const createThought = (req, res) => {
  return res.send("createThought");
};
const updateThought = (req, res) => {
  return res.send("updateThought");
};
const deleteThought = (req, res) => {
  return res.send("deleteThought");
};

module.exports = {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
};
