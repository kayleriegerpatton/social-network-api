const { Router } = require("express");

const { deleteFriend, createFriend } = require("../../controllers/api/friends");

const router = Router();

router.post("/:friendId", createFriend);
router.delete("/:friendId", deleteFriend);

module.exports = router;
