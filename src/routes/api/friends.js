const { Router } = require("express");

const { deleteFriend, createFriend } = require("../../controllers/api/friends");

const router = Router({ mergeParams: true });

router.post("/", createFriend);
router.delete("/:friendId", deleteFriend);

module.exports = router;
