const { Router } = require("express");

const {
  createReaction,
  deleteReaction,
} = require("../../controllers/api/reactions");

const router = Router();

router.post("/:reactionId", createReaction);
router.delete("/:reactionId", deleteReaction);

module.exports = router;
