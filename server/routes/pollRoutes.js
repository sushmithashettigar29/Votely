const express = require("express");
const router = express.Router();
const {
  createPoll,
  getPollDetails,
  getPollResults,
  getMyPolls,
  deletePoll,
  exportPollCSV,
} = require("../controller/pollController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createPoll);
router.get("/my", protect, getMyPolls);
router.get("/:pollId/export", protect, exportPollCSV);
router.delete("/:pollId", protect, deletePoll);
router.get("/:pollId/results", protect, getPollResults);
router.get("/:pollId", getPollDetails);

module.exports = router;
