const Poll = require("../models/Poll");
const { Parser } = require("json2csv");

// Create Poll
exports.createPoll = async (req, res) => {
  try {
    const { question, type, options, voteLimit, duration, isResultPublic } =
      req.body;
    const userId = req.user.id;

    if (!question || !type) {
      return res
        .status(400)
        .json({ message: "Question and type are required" });
    }

    let formattedOptions = options;

    if (type === "truefalse") {
      formattedOptions = [
        { text: "True", votes: 0 },
        { text: "False", votes: 0 },
      ];
    }

    if (type === "mcq" && (!formattedOptions || formattedOptions.length < 2)) {
      return res
        .status(400)
        .json({ message: "At least two options required for MCQ" });
    }

    const deadline = new Date(Date.now() + duration * 60 * 1000);

    const poll = await Poll.create({
      question,
      type,
      options: formattedOptions,
      voteLimit,
      deadline,
      owner: userId,
      isResultPublic: isResultPublic ?? true,
    });

    res.status(201).json({
      message: "Poll created successfully",
      pollId: poll.pollId,
      link: `${req.protocol}://${req.get("host")}/poll/${poll.pollId}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create Poll" });
  }
};

// Get poll details
exports.getPollDetails = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findOne({ pollId }).lean();

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const now = new Date();
    const deadline = new Date(poll.deadline);
    const timeLeftMs = deadline - now;
    const timeLeft = timeLeftMs > 0 ? Math.floor(timeLeftMs / 1000) : 0;

    res.status(200).json({
      question: poll.question,
      type: poll.type,
      options: poll.options,
      comments: poll.comments || [],
      voteLimit: poll.voteLimit,
      voteCount: poll.voteCount,
      deadline: poll.deadline,
      timeLeftSeconds: timeLeft,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch poll details" });
  }
};

// Get Poll Results
exports.getPollResults = async (req, res) => {
  try {
    const { pollId } = req.params;
    const userId = req.user?.id;

    const poll = await Poll.findOne({ pollId });

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (!poll.isResultPublic && String(poll.owner) !== String(userId)) {
      return res.status(403).json({ message: "Results are private" });
    }

    const result = {
      question: poll.question,
      type: poll.type,
      totalVotes: poll.voteCount,
    };

    if (poll.type === "comment") {
      result.commentCount = poll.comments.length;
      result.comments = poll.comments;
    } else {
      result.options = poll.options.map((opt) => ({
        text: opt.text,
        votes: opt.votes,
      }));
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get poll results." });
  }
};

// Get all polls for Logged-in User
exports.getMyPolls = async (req, res) => {
  try {
    const userId = req.user.id;

    const polls = await Poll.find({ owner: userId }).sort({ createdAt: -1 });

    const now = new Date();

    const pollSummary = polls.map((poll) => {
      const isExpired = poll.deadline && new Date(poll.deadline) < now;
      return {
        pollId: poll.pollId,
        question: poll.question,
        type: poll.type,
        voteCount: poll.voteCount,
        voteLimit: poll.voteLimit,
        deadline: poll.deadline,
        isExpired,
        isResultPublic: poll.isResultPublic,
        createdAt: poll.createdAt,
      };
    });

    res.status(200).json(pollSummary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch your polls" });
  }
};

// Delete Poll
exports.deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const userId = req.user.id;

    const poll = await Poll.findOne({ pollId });

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (String(poll.owner) !== String(userId)) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this poll" });
    }

    await Poll.deleteOne({ pollId });

    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete poll" });
  }
};

// Export in CSV format
exports.exportPollCSV = async (req, res) => {
  try {
    const { pollId } = req.params;
    const userId = req.user.id;

    const poll = await Poll.findOne({ pollId });

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (String(poll.owner) !== String(userId)) {
      return res
        .status(403)
        .json({ message: "Not authorized to export this poll" });
    }

    let fields, data;

    if (poll.type === "comment") {
      fields = ["text", "timestamp"];
      data = poll.comments;
    } else {
      fields = ["Option", "Votes"];
      data = poll.options.map((opt) => ({
        Option: opt.text,
        Votes: opt.votes,
      }));
    }

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment(`${poll.question.replace(/\s+/g, "_")}_results.csv`);
    return res.send(csv);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to export poll results." });
  }
};
