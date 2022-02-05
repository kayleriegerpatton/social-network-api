const { Router } = require("express");

const users = require("./users");
const thoughts = require("./thoughts");

const router = Router();

router.use("/users", users);
router.use("/thoughts", thoughts);

module.exports = router;
