import mongoose from 'mongoose';

const { Schema } = mongoose;
const compareDate = new Date().toDateString();
const compareResultSchema = new Schema({
  students: {
    type: [String],
    required: true
  },
  totalSentences: {
    type: Number,
    required: true,
  },
  similarSentences: {
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

export default Compare