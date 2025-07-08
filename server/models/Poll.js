const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const optionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["mcq", "truefalse", "comment"],
      required: true,
    },
    options: [optionSchema],
    comments: [
      {
        text: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    voteLimit: {
      type: Number,
      default: 0,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
    deadline: Date,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pollId: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    isResultPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", pollSchema);
