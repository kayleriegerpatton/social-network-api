const getThoughts = (req, res) => {
  return res.send("getThoughts");
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
