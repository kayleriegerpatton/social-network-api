const { User } = require("../../models");

const createFriend = async (req, res) => {
  try {
    const { userId } = req.params;
    const friendId = req.body;

    if (friendId) {
      const newFriend = await User.findByIdAndUpdate(
        userId,
        {
          $push: { friends: friendId },
        },
        { returnDocument: "after" }
      );
      return res.json({ success: true, data: newFriend });
    }
    return res
      .status(400)
      .json({ success: false, error: "Please provide the friend id." });
  } catch (error) {
    console.log(`[ERROR]: Failed to add friend | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to add friend." });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const deletedFriend = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { returnDocument: "after" }
    );
    return res.json({ success: true, data: deletedFriend });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete friend | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete friend." });
  }
};

module.exports = { deleteFriend, createFriend };
