const mongoose = require('mongoose');

const { Schema } = mongoose;
const submissionTime = new Date().toDateString();
const submissionSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: submissionTime,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
