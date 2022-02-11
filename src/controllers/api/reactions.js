const { Thought } = require("../../models");

const createReaction = async (req, res) => {
  try {
    // get post body & thought id from params
    const { thoughtId } = req.params;
    const reaction = req.body;

    if (reaction) {
      // push post body as update to thought document
      const newReaction = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $push: { reactions: reaction },
        },
        { returnDocument: "after" }
      );

      return res.json({ success: true, data: newReaction });
    }
    // req.body missing entries (bad request)
    return res.status(400).json({
      success: false,
      error: "Please provide the reaction body and username.",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create reaction | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create raction." });
  }
};

const deleteReaction = async (req, res) => {
  // get post body & thought id from params
  const { thoughtId, reactionId } = req.params;

  // const deletedReaction = await;
  return res.send("deleteReaction");
};

module.exports = { createReaction, deleteReaction };
