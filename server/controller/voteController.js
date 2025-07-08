const Poll = require("../models/Poll");

// Vote
exports.votePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { selectedOption, commentText } = req.body;

    const poll = await Poll.findOne({ pollId });

    if (!poll) {
      return res.status(404).json({ message: "Poll not found." });
    }

    if (poll.deadline && new Date() > new Date(poll.deadline)) {
      return res.status(400).json({ message: "Poll has expired" });
    }

    if (poll.voteLimit > 0 && poll.voteCount >= poll.voteLimit) {
      return res.status(400).json({ message: "Vote limit reached" });
    }

    if (poll.type === "comment") {
      if (!commentText) {
        return res.status(400).json({ message: "Comment text is required" });
      }
      poll.comments.push({ text: commentText });
    } else {
      const option = poll.options.find((opt) => opt.text === selectedOption);
      if (!option) {
        return res.status(400).json({ message: "Invalid option selected" });
      }
      option.votes += 1;
    }

    poll.voteCount += 1;
    await poll.save();

    res.status(200).json({ message: "Vote submitted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Voting failed" });
  }
};
