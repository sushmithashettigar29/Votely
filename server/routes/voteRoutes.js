const express = require("express");
const router = express.Router();
const { votePoll } = require("../controller/voteController");

router.post("/:pollId", votePoll);

module.exports = router;
