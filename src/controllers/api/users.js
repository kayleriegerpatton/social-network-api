const getUsers = (req, res) => {
  return res.send("getUsers");
};
const getUserById = (req, res) => {
  // populate with thoughts and friends
  return res.send("getUserById");
};
const createUser = (req, res) => {
  return res.send("createUser");
};
const updateUser = (req, res) => {
  return res.send("updateUser");
};
const deleteUser = (req, res) => {
  return res.send("deleteUser");
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
