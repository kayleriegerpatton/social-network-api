// * remember to destructure both ids from params {thoughtId, reactionId}

const createReaction = (req, res) => {
  return res.send("createReaction");
};
const deleteReaction = (req, res) => {
  return res.send("deleteReaction");
};

module.exports = { createReaction, deleteReaction };
