const mongoose = require('mongoose');
const schema = mongoose.Schema;

function arrLimit(val) {
  return val.length === 4;
}

const questionSchema = new schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    image: { type: String, require: true },
    timeLimit: { type: Number, default: 20 },
    description: {
      type: String,
      required: true,
    },
    options: {
      type: [{ type: String, required: true }],
      validate: [arrLimit, '{PATH} must have exactly 4 elements'],
    },
    answer: {
      type: Number,
      required: true,
    },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  },
  {
    timestamps: true,
  },
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
