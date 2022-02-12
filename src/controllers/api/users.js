const { User, Thought } = require("../../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("thoughts");
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
  try {
    const { username, email } = req.body;

    if (username && email) {
      const newUser = await User.create({ username, email });
      return res.json({ success: true, data: newUser });
    }

    // req.body missing entries (bad request)
    return res.status(400).json({
      success: false,
      error: "Please provide the username and email.",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create user | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create user." });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    if (username && email) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            username,
            email,
          },
        },
        { returnDocument: "after" }
      );

      return res.json({ success: true, data: updatedUser });
    }
    return res.status(400).json({
      success: false,
      error: "Please provide the username and email.",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to update user | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update user." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    // Delete user's associated thoughts on delete
    await Thought.deleteMany({ username: user.username });

    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete user | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete user." });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
