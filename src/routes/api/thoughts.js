const { Router } = require("express");

const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/api/thoughts");
const reactions = require("./reactions");

const router = Router();

router.get("/", getThoughts);
router.get("/:id", getThoughtById);
router.post("/", createThought);
router.put("/:id", updateThought);
router.delete("/:id", deleteThought);

router.use("/:thoughtId/reactions", reactions);

module.exports = router;
