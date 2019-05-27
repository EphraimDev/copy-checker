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
  noOfTotalSentences: {
    type: Number,
    required: true,
  },
  noOfSimilarSentences: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  dateOfTest: {
    type: String,
    required: true,
    default: compareDate,
  },
}, { timestamps: true });

const Compare = mongoose.model('Compare', compareResultSchema);

export default Compare;