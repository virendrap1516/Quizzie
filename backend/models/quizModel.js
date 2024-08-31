const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema(
  {
    quizType: {
      type: String,
      required: true,
    },
    quizName: {
      type: String,
      required: true,
    },
    slides: [
      {
        question: {
          type: String,
          required: [true, "Please Enter a Question"],
        },
        answer: {
          text: {
            type: String,
          },
          imageUrl: {
            type: String,
          },
        },
        optionType: {
          type: String,
          required: true,
        },
        options: [
          {
            text: {
              type: String,
            },
            imageUrl: {
              type: String,
            },
            selectionCount: {
              type: Number,
              default: 0,
            },
          },
        ],
        timer: {
          type: String,
          default: "OFF",
        },
        correctAnswerCount: {
          type: Number,
          default: 0,
        },
        wrongAnswerCount: {
          type: Number,
          default: 0,
        },
      },
    ],
    impression: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Quiz", quizSchema);
