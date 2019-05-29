import mongoose from 'mongoose';

const { Schema } = mongoose;
const compareDate = new Date().toDateString();
const compareResultSchema = new Schema({
  students: {
    type: [String],
    required: true,
  },
  sameSentence: {
    type: [String],
    required: true
  },
  noOfFirstTotalSentences: {
    type: Number,
    required: true,
  },
  noOfSecondTotalSentences: {
    type: Number,
    required: true,
  },
  noOfSimilarSentences: {
    type: Number,
    required: true,
  },
  totalSentences: {
    type: [Number],
    required: true
  },
  noOfFirstPercentage: {
    type: Number,
    required: true,
  },
  noOfSecondPercentage: {
    type: Number,
    required: true,
  },
  dateOfTest: {
    type: String,
    required: true,
    default: compareDate,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Compare = mongoose.model('Compare', compareResultSchema);

export default Compare;
