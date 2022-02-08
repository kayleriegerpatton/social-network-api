const { User, Thought } = require("../../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ success: true, data: users });
  } catch (error) {
    console.log(`[ERROR]: Failed to get users | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to get users." });
  }
};

const getUserById = async (req, res) => {
  try {
    // get user id from params
    const userId = req.params.id;

    // populate with thoughts array and friends array
    const user = await User.findById(userId)
      .populate("thoughts")
      .populate("friends");

    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(`[ERROR]: Failed to get user. | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to get user." });
  }
};
const createUser = async (req, res) => {
  return res.send("createUser");
};
const updateUser = async (req, res) => {
  return res.send("updateUser");
};
const deleteUser = async (req, res) => {
  return res.send("deleteUser");
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
