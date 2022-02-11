// * remember to destructure both ids from params {userId, friendId}

const createFriend = (req, res) => {
  return res.send("createFriend");
};

const deleteFriend = (req, res) => {
  return res.send("deleteFriend");
};

module.exports = { deleteFriend, createFriend };
