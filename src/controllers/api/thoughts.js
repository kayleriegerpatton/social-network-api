const { Thought, User } = require("../../models");

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    return res.json({ success: true, data: thoughts });
  } catch (error) {
    console.log(`[ERROR]: Failed to get thoughts | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to get thoughts." });
  }
};

const getThoughtById = async (req, res) => {
  try {
    // get thought id from params
    const thoughtId = req.params.id;

    const thought = await Thought.findById(thoughtId);

    return res.json({ success: true, data: thought });
  } catch (error) {
    console.log(`[ERROR]: Failed to get thought. | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to get thought." });
  }
};

const createThought = async (req, res) => {
  //* remember to push new thought's _id to the user's thoughts array

  // post body should look like this:
  //   {
  //     "thoughtText": "I miss Tony.",
  //     "username": "peterParker",
  //     "userId": "620177411dabfeba4dfc5d3c"
  // }

  // get post body
  // create new thought
  // get new thought id
  // push thought id to user's thought array
  return res.send("createThought");
};

const updateThought = async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const { thoughtText } = req.body;

    if (thoughtText) {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $set: {
            thoughtText,
          },
        },
        { returnDocument: "after" }
      );

      return res.json({ success: true, data: updatedThought });
    }
    return res.status(400).json({
      success: false,
      error: "Please provide the thought text.",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to update thought | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update thought." });
  }
};

const deleteThought = async (req, res) => {
  try {
    const thoughtId = req.params.id;

    const thought = await Thought.findByIdAndDelete(thoughtId);
    return res.json({ success: true, data: thought });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete thought | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete thought." });
  }
};

module.exports = {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
};
