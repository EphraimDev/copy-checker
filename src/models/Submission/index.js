import mongoose from 'mongoose';

const { Schema } = mongoose;
const submissionTime = new Date().toDateString();
const submissionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: false
  },
  topic: {
    type: String,
    required: false
  },
  text: {
    type: [String],
    required: true,
  },
  date: {
    type: String,
    default: submissionTime,
    required: true,
  },
}, { timestamps: true });

export const Submission = mongoose.model('Submission', submissionSchema);
